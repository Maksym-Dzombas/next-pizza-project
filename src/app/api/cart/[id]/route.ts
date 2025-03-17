import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = (await req.json()) as { quantity: number };
    const cartToken = req.cookies.get("cartToken")?.value;


    if (!cartToken) return NextResponse.json({ error: "Токен корзины отсутствует.." });
    const сart = await prisma.cart.findFirst({
      where: {
        token: cartToken
      }
    })
    if (!Boolean(сart)) return NextResponse.json({ message: "Такой корзины не существует.." })

    await prisma.cartItem.update({
      where: {
        id: Number(id)
      },
      data: {
        quantity: data.quantity
      }
    });

    const updatedUserCart = await updateCartTotalAmount(cartToken);
    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log("[CART_PATCH] Server error", error);
    return NextResponse.json({ message: "Не удалось обновить корзину", status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cartToken = req.cookies.get("cartToken")?.value;

    if (!cartToken) return NextResponse.json({ error: "Токен корзины отсутствует.." });
    const cart = await prisma.cart.findFirst({
      where: {
        token: cartToken
      }
    })

    if (!cart) return NextResponse.json({ error: "Такой корзины не существует.." });
    await prisma.cartItem.delete({
      where: {
        id: Number(id)
      }
    })

    const updatedUserCart = await updateCartTotalAmount(cartToken);
    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log("[CART_DELETE] Server error", error);
    return NextResponse.json({ message: "Не удалось удалить товар", status: 500 });
  }
}