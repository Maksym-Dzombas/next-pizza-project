import { User } from "@prisma/client";
import { instanceAxios } from "./instance"

export const getMe = async () => {
  const { data } = await instanceAxios.get<User>("/auth/me");

  return data;
}