import { findOrCreateCart } from "@/lib/find-or-create-cart";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { CreateCartItemData } from "../../../../services/dto/cart.dto";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { createOrFindTheSameProduct } from "@/lib/create-or-find-the-same-product";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const userId = 1;
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, cart: {} });
    }

    const cart = await prisma.cart.findFirst({
      where: { token: token },
      include: {
        items: {
          orderBy: { createdAt: "desc" },
          include: {
            variationProduct: {
              include: {
                product: true
              }
            },
            ingredients: true
          }
        },
      }
    })

    return NextResponse.json(cart);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as CreateCartItemData;
    let cartToken = req.cookies.get("cartToken")?.value;

    if (!cartToken) {
      cartToken = crypto.randomUUID();
    }

    const cart = await findOrCreateCart(cartToken);
    await createOrFindTheSameProduct(cart, data);

    const updatedUserCart = await updateCartTotalAmount(cartToken);
    const response = NextResponse.json(updatedUserCart);
    response.cookies.set("cartToken", cartToken);
    return response;
  } catch (error: any) {
    console.log("[CART_POST] Server error", error.message);
    return NextResponse.json({ message: "Не удалось добавить товар", status: 500 });
  }
}