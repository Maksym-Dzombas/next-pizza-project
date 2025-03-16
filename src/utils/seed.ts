export function randomPrice(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateVariationProduct({ price, size, pizzaType, productId }: {
  price?: number,
  size?: 20 | 30 | 40,
  pizzaType?: 1 | 2,
  productId: number
}) {
  return {
    price: price ? price : randomPrice(50, 200),
    size,
    pizzaType,
    productId
  }
}