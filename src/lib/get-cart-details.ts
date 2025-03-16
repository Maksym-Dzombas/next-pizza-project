import { StateCartItem } from "../../store/cart";
import { CartDTO } from "../../services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

interface Return {
  items: StateCartItem[]
  totalAmount: number
}

export const getCartDetails = (data: CartDTO): Return => {
  const correctItems = data.items.map(item => ({
    id: item.id,
    quantity: item.quantity,
    name: item.variationProduct.product.name,
    imageUrl: item.variationProduct.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.variationProduct.size,
    pizzaType: item.variationProduct.pizzaType,
    ingredients: item.ingredients ? item.ingredients.map((ingredient: { name: string, price: number }) => ({
      name: ingredient.name,
      price: ingredient.price
    })) : [],
    deleted: false
  })) as StateCartItem[];

  const totalAmountTheCart = correctItems.reduce((acc, correctItem) => acc + correctItem.price, 0);

  return {
    totalAmount: totalAmountTheCart,
    items: correctItems
  }
}