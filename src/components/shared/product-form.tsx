"use client";

import toast from "react-hot-toast";
import { ProductWithRelations } from "../../../@types/prisma";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { useCartStore } from "../../../store/cart";
import { ChooseProductForm } from "./choose-product-form";

interface ProductForm {
  product: ProductWithRelations
  isProductPage?: boolean
  router?: VoidFunction
  className?: string
}

export const ProductForm: React.FC<ProductForm> = ({ product, router, isProductPage }) => {
  const isPizza = product.variations.filter((variation => variation.pizzaType !== null && variation.pizzaType !== undefined));
  const addCartItem = useCartStore(state => state.addCartItem);
  const loading = useCartStore(state => state.loading);

  const onSubmit = (variationProductId: number, ingredients: number[] = []) => {
    try {
      addCartItem({
        variationProductId,
        ingredients
      })

      setTimeout(() => {
        toast.success(isPizza.length > 0 ? `Пицца "${product.name}" успешно добавлена в корзину!` : `Продукт "${product.name}" успешно добавлен в корзину!`);

        if (router) router();
      }, 3600);
    } catch (error) {
      console.error("[ADD TO CART] Error: ", error);
      toast.error(`Не удалось добавить "${product.name}" в корзину :(`);
    }
  }

  if (isPizza.length > 0) {
    return <ChoosePizzaForm isProductPage={isProductPage} loading={loading} onClickAddCart={onSubmit} imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} variations={product.variations} />
  } else {
    return <ChooseProductForm isProductPage={isProductPage} loading={loading} onClickAddCart={onSubmit} price={product.variations[0].price} imageUrl={product.imageUrl} name={product.name} variations={product.variations} />
  }
}