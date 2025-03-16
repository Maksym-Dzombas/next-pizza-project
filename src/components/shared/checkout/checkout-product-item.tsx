"use client"

import { cn } from "@/lib/utils"
import { CartItemProps } from "../cart-item-details/cart-item-details.types"
import { CountButtonProps } from "../count-button"
import { CartItemDetailsImage } from "../cart-item-details/cart-item-details-image"
import { CartItemInfo } from "../cart-item-details/cart-item-info"
import { CartItemDetailsPrice } from "../cart-item-details/cart-item-details-price"
import { CartItemDetailsCountButton } from "../cart-item-details/cart-item-details-count-button"
import { X } from "lucide-react"

interface Props extends CartItemProps {
  onClickRemove?: VoidFunction
  onClickCountButton?: CountButtonProps['onClick']
  className?: string
}

export const CheckoutProductItem: React.FC<Props> = ({ name, price, imageUrl, quantity, details, disabled, className, onClickCountButton, onClickRemove }) => {

  return (
    <div className={cn("flex items-center justify-between", { "opacity-50": disabled }, className)}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetailsImage src={imageUrl} />
        <CartItemInfo name={name} details={details} />
      </div>
      <CartItemDetailsPrice value={price} />
      <div className="flex items-center gap-5 ml-20">
        <CartItemDetailsCountButton onClick={(type: "minus" | "plus") => onClickCountButton?.(type)} value={quantity} />
        <button onClick={onClickRemove}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
        </button>
      </div>
    </div>
  )
}