import axios from "axios";

export const instanceAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})