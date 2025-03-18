import { instanceAxios } from "./instanceAxios"
import { ApiRoutes } from "./constants";
import { Ingredient } from "@prisma/client";

export const getAll = async () => {
  const { data } = await instanceAxios.get<Ingredient[]>(ApiRoutes.GET_INGREDIENTS);

  return data;
}