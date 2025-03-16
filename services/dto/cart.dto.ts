import { Cart, CartItem, Ingredient, Product, ProductVariation } from "@prisma/client";

export type CartItemDTO = CartItem & {
  variationProduct: ProductVariation & {
    product: Product
  }
  ingredients: Ingredient[]
}

export interface CartDTO extends Cart {
  items: CartItemDTO[]
}

export interface CreateCartItemData {
  variationProductId: number
  ingredients?: number[]
}