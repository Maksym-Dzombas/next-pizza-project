import { create } from "zustand"
import ApiClient from "../services/api-client"
import { getCartDetails } from "@/lib/get-cart-details"
import { CreateCartItemData } from "../services/dto/cart.dto"

export type StateCartItem = {
  id: number
  quantity: number
  name: string
  imageUrl: string
  price: number
  pizzaSize?: number | null
  pizzaType?: number | null
  ingredients?: Array<{ name: string; price: number }>
  disabled?: boolean
}

export interface CartState {
  isSuccessAddProduct: boolean
  loading: boolean
  error: boolean
  totalAmount: number
  items: StateCartItem[]
  getCartItems: () => Promise<void>
  updateItemQuantity: (id: number, quantity: number) => Promise<void>
  removeCartItem: (id: number) => Promise<void>
  addCartItem: (values: any) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalAmount: 0,
  error: false,
  loading: true,
  isSuccessAddProduct: false,

  getCartItems: async () => {
    try {
      set({ loading: true, error: false })
      const data = await ApiClient.cart.getCart();

      if (!data) {
        console.error("API returned invalid data: ", data);
        set({ totalAmount: 0, items: [] });
        return;
      }

      set(getCartDetails(data));
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set(state => ({ loading: true, error: false, items: state.items.map(item => item.id === id ? { ...item, disabled: true } : item) }));

      const data = await ApiClient.cart.updateItemQuantity(id, quantity);

      if (!data) {
        console.error("API returned invalid data: ", data);
        set({ totalAmount: 0, items: [] });
        return;
      }

      set(getCartDetails(data));
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set(state => ({ loading: false, items: state.items.map(item => ({ ...item, disabled: false })) }));
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set(state => ({ loading: true, error: false, items: state.items.map(item => item.id === id ? { ...item, disabled: true } : item) }));
      const data = await ApiClient.cart.removeCartItem(id);

      if (!data) {
        console.error("API returned invalid data: ", data);
        set({ totalAmount: 0, items: [] });
        return;
      }

      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
    } finally {
      set(state => ({ loading: false, items: state.items.map(item => ({ ...item, disabled: false })) }));
    }
  },
  addCartItem: async (dataFrontend: CreateCartItemData) => {
    try {
      set({ loading: true, error: false, isSuccessAddProduct: false });
      const data = await ApiClient.cart.addCartItem(dataFrontend);

      if (!data) {
        console.error("API returned invalid data: ", data);
        set({ totalAmount: 0, items: [] });
      }

      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false, isSuccessAddProduct: true });
    }
  }
}))