import { Ingredient, ProductVariation } from "@prisma/client";
import { PizzaSize, PizzaType } from "../../@types/pizza";

export const calcTotalPricePizza = (
  type: PizzaType,
  size: PizzaSize,
  variations: ProductVariation[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalIngredientsPrice = ingredients
    .filter(ingredient => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  const pizzaPrice = variations.find(item => item.pizzaType === type && item.size === size)?.price;

  return {
    totalIngredientsPrice,
    pizzaPrice
  }
}