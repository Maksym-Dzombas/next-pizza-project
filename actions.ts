"use server"

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "./constants/checkout-form-schema";
import { cookies } from "next/headers";
import { OrderStatus, Prisma } from "@prisma/client";
import { sendEmail } from "@/lib/send-email";
import { PayOrderEmail } from "@/components/shared/email-templates/pay-order";
import { createPayment } from "@/lib/create-payment";
import { getServerSession } from "next-auth";
import { authOptions } from "./constants/auth-options";
import { hashSync } from "bcryptjs";
import { VerificationUserEmail } from "@/components/shared/email-templates/verification-user";

export const createOrder = async (data: CheckoutFormValues) => {
  try {
    const cookieStore = cookies();
    const cartToken = (await cookieStore).get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    // Находим корзину по токену
    const cart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            variationProduct: {
              include: {
                product: true
              }
            }
          }
        }
      },
      where: {
        token: cartToken
      }
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    if (cart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    // Создаём заказ
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: cart.totalAmount,
        status: OrderStatus.PENDING,
        items: cart.items
      }
    });

    // Ощищаем корзину
    await prisma.cart.update({
      where: {
        id: cart.id
      },
      data: {
        totalAmount: 0
      }
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id
      }
    });

    const paymentData = await createPayment({
      orderId: order.id,
      amount: String(order.totalAmount),
      description: "Оплата заказа №" + order.id
    });

    if (!paymentData) {
      throw new Error("Payment data not found");
    }

    const paymentUrl = paymentData.confirmation.confirmation_url;
    await prisma.order.update({
      where: {
        id: order.id
      },
      data: {
        paymantId: paymentData.id
      }
    })

    await sendEmail(
      data.email,
      "Next Pizza / Оплатите заказ №" + order.id,
      await PayOrderEmail({ orderId: order.id, totalAmount: order.totalAmount, paymentUrl: paymentUrl }));

    return paymentUrl;
  } catch (error) {
    console.log("[CreateOrder] Server error", error);
  }
}

export const updateUserInfo = async (data: Prisma.UserUpdateInput) => {
  try {
    const userSession = await getServerSession(authOptions);

    if (!userSession) {
      throw new Error("Пользователь не найден");
    }

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userSession.user.id)
      }
    });

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    await prisma.user.update({
      where: {
        id: Number(userSession.user.id)
      },
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password ? hashSync(data.password as string, 10) : user.password
      }
    });
  } catch (error) {
    console.error("[UPDATE USER DATA]: ", error);
  }
}

export const registerUser = async (data: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email
      }
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Пользователь не верифицирован");
      }

      throw new Error("Такой пользователь уже существует");
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: hashSync(data.password as string, 10)
      }
    });

    const code = Math.floor(100000 + Math.random() * 1000000).toString();

    await prisma.verificationCode.create({
      data: {
        code: code,
        userId: createdUser.id
      }
    });

    await sendEmail(createdUser.email, "Next Pizza / Верификация аккаунта", await VerificationUserEmail({ code: code }));


  } catch (errror) {
    console.error("[REGISTER USER]: ", errror);
  }
};