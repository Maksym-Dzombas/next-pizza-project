import { instanceAxios } from "./instance"
import { CartDTO, CreateCartItemData } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await instanceAxios.get<CartDTO>("/cart");

  return data;
}

export const updateItemQuantity = async (id: number, quantity: number): Promise<CartDTO> => {
  const { data } = await instanceAxios.patch<CartDTO>("/cart/" + id, { quantity });

  return data;
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  const { data } = await instanceAxios.delete<CartDTO>("/cart/" + id);

  return data;
}

export const addCartItem = async (dataFrontend: CreateCartItemData): Promise<CartDTO> => {
  const { data } = await instanceAxios.post<CartDTO>("/cart", dataFrontend);

  return data;
}