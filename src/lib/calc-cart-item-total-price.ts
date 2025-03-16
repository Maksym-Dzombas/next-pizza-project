import { CartItemDTO } from "../../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  if (!item.ingredients || item.ingredients.length === 0) {
    return item.variationProduct.price * item.quantity;
  }
  
  const totalPriceAllTheIngredients = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

  return (totalPriceAllTheIngredients + item.variationProduct.price) * item.quantity;
}