import { User } from "@prisma/client";
import { instanceAxios } from "./instanceAxios"

export const getMe = async () => {
  const { data } = await instanceAxios.get<User>("/auth/me");

  return data;
}