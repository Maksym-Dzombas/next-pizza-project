import { prisma } from "@/prisma/prisma-client";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export const updateCartTotalAmount = async (cartToken: string) => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token: cartToken
    },
    include: {
      items: {
        include: {
          variationProduct: {
            include: {
              product: true
            }
          },
          ingredients: true
        }
      }
    }
  })

  const totalAmountTheCart = userCart?.items.reduce((acc, item) => {
    return acc + calcCartItemTotalPrice(item);
  }, 0)

  return await prisma.cart.update({
    where: {
      id: userCart?.id
    },
    data: {
      totalAmount: totalAmountTheCart
    },
    include: {
      items: {
        include: {
          variationProduct: {
            include: {
              product: true
            }
          },
          ingredients: true
        }
      }
    }
  })
};