import { prisma } from "@/prisma/prisma-client";
import { Cart } from "@prisma/client";
import { CreateCartItemData } from "../../services/dto/cart.dto";

export const createOrFindTheSameProduct = async (cart: Cart, dataFrontend: CreateCartItemData) => {
  try {
    const existingCartItems = await prisma.cartItem.findMany({
      where: {
        cartId: cart.id,
        variationProductId: dataFrontend.variationProductId
      },
      include: {
        ingredients: true
      }
    });

    const frontendIngredients = dataFrontend.ingredients?.sort();
    let foundCartItemTheSame = false;
    for (const cartItem of existingCartItems) {
      const ingredientsOfExistingItems = cartItem.ingredients.map(ingredient => (ingredient.id)).sort();

      if (JSON.stringify(frontendIngredients) === JSON.stringify(ingredientsOfExistingItems)) {
        await prisma.cartItem.update({
          where: {
            id: cartItem.id
          },
          data: {
            quantity: cartItem.quantity + 1
          }
        });

        foundCartItemTheSame = true;
        break;
      }
    }

    if (!foundCartItemTheSame) {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          variationProductId: dataFrontend.variationProductId,
          quantity: 1,
          ingredients: {
            connect: dataFrontend.ingredients?.map(ingredientId => ({ id: ingredientId }))
          }
        }
      })
    }
  } catch (error) {
    console.error("[CREATE_OR_FIND_PRODUCT] Error: ", error);
    console.log("Не удалось создать или обновить существующие продукты в корзине");
  }
}