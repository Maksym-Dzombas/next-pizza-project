import axios from "axios";

export const instanceAxios = axios.create({
  baseURL: process.env.API_URL
})