import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }),
});

export const registerSchema = loginSchema.merge(
  z.object({
    fullName: z.string().min(3, { message: "Введите имя и фамилию" }),
    confirmPassword: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }),
  })
).refine(data => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

export const updateSchema = z.object({
  fullName: z.string().min(3, { message: "Введите имя и фамилию" }),
  email: z.string().email({ message: "Введите корректный email" }),
  password: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }).optional().or(z.literal("")),
  confirmPassword: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }).optional().or(z.literal("")),
}).refine(data => {
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword;
  }

  return true;
}, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type UpdateValues = z.infer<typeof updateSchema>;