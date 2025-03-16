import { prisma } from "@/prisma/prisma-client"

export const findOrCreateCart = async (cartToken: string) => {
  let cart = await prisma.cart.findFirst({
    where: {
      token: cartToken
    },
    include: {
      items: true
    }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        token: cartToken
      },
      include: {
        items: true
      }
    })
  }

  return cart;
}