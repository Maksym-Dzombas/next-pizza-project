import { PizzaSize, PizzaType } from "../../@types/pizza";
import { mapPizzaType } from "../../constants/pizza";

export const getCartItemDetails = (pizzaType: PizzaType, pizzaSize: PizzaSize, ingredients: Array<{name: string, price: number}>): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const pizzaTypeName = mapPizzaType[pizzaType];
    details.push(`${pizzaTypeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map(ingredient => ingredient.name));
  }

  return details.join(", ");
}