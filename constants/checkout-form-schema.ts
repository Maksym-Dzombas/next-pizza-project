import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: "Имя должно быть больше 2 символов" }),
  lastName: z.string().min(2, { message: "Фамилия должна быть больше 2 символов" }),
  email: z.string().email({ message: "Введите корректную почту" }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона" }),
  address: z.string().min(5, { message: "Введите корректный адресс" }),
  comment: z.string().optional()
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;