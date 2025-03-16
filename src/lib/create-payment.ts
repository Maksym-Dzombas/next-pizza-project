import axios from "axios";
import { PaymentData } from "../../@types/yookassa";
import { randomUUID } from "crypto";

interface CreatePaymentDetails {
  amount: string
  description: string
  orderId: number
}

export const createPayment = async (details: CreatePaymentDetails) => {
  const { data } = await axios.post<PaymentData>("https://api.yookassa.ru/v3/payments", {
    amount: {
      value: details.amount,
      currency: "RUB"
    },
    capture: true,
    description: details.description,
    metadata: {
      order_id: details.orderId
    },
    confirmation: {
      type: "redirect",
      return_url: process.env.YOOKASSA_RETURN_URL as string
    }
  }, {
    auth: {
      username: process.env.YOOKASSA_STORE_ID as string,
      password: process.env.API_YOOKASSA_KEY as string
    },
    headers: {
      "Content-Type": "application/json",
      "Idempotence-Key": randomUUID()
    }
  });

  return data;
};