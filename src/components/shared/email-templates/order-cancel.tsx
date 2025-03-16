import React from "react";
import { Title } from "@/components/shared/title";
import { CartItemDTO } from "../../../../services/dto/cart.dto";

interface Props {
  orderId: number
  items: CartItemDTO[]
}
export const OrderCancelEmail: React.FC<Props> = ({ orderId, items }) => {

  return (
    <div>
      <p>Ваш заказ №${orderId} был отменен. Пожалуйста, свяжитесь с нами для уточнения деталей. То что вы заказывали:</p>
      <hr />
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <img src={item.variationProduct.product.imageUrl} alt={item.variationProduct.product.name} />
            <p>{item.variationProduct.product.name} | {item.variationProduct.price} ₽ * {item.quantity} шт. = {item.variationProduct.price * item.quantity} ₽</p>
          </li>
        ))}
      </ul>
    </div>
  )
};