import React from "react";
import { Title } from "@/components/shared/title";
import { CartItemDTO } from "../../../../services/dto/cart.dto";

interface Props {
  orderId: number
  totalAmount: number
  items: CartItemDTO[]
}
export const OrderSuccessEmail: React.FC<Props> = ({ orderId, totalAmount, items }) => {

  return (
    <div>
      <p>Ваш заказ №{orderId} успешно оформлен. Спасибо за покупку. Список товаров:</p>
      <hr />
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <p>{item.variationProduct.product.name} | {item.variationProduct.price} ₽ * {item.quantity} шт. = <b>{item.variationProduct.price * item.quantity} ₽</b></p>
          </li>
        ))}
      </ul>
      <h4>Сумма заказа: <b>{totalAmount} ₽</b> (Вместе с доставкой и налогами)</h4>
    </div>
  )
};