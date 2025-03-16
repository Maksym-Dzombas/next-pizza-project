import React from "react";
import { useCartStore } from "../store/cart";

export const useCart = () => {
  const totalAmount = useCartStore(state => state.totalAmount);
  const items = useCartStore(state => state.items);
  const getCartItems = useCartStore(state => state.getCartItems);
  const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
  const removeCartItem = useCartStore(state => state.removeCartItem);
  const loading = useCartStore(state => state.loading);

  React.useEffect(() => {
    getCartItems();
  }, []);

  return {
    totalAmount,
    items,
    loading,
    updateItemQuantity,
    removeCartItem
  }
}
