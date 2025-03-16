import { Product } from "@prisma/client"
import { instanceAxios } from "./instance"
import { ApiRoutes } from "./constants";

export const search = async (query: string) => {
  const { data } = await instanceAxios.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query: query } })

  return data;
}