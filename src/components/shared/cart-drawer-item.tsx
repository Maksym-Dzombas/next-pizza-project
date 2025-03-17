"use client";

import { cn } from '@/lib/utils'
import React from 'react'
import { CartItemDetailsImage } from './cart-item-details/cart-item-details-image'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import { CartItemInfo } from './cart-item-details/cart-item-info'
import { CountButton } from './count-button'
import { CartItemDetailsPrice } from './cart-item-details/cart-item-details-price'
import { Trash2Icon } from 'lucide-react'

interface Props extends CartItemProps {
  onClickCountButton: (type: "plus" | "minus") => void
  onClickDeleteItem: () => void
  deleted?: boolean
  className?: string
}

export const CartDrawerItem: React.FC<Props> = ({ className, deleted, imageUrl, price, name, quantity, details, onClickCountButton, onClickDeleteItem }) => {
  return (
    <div className={cn("flex bg-white p-5 gap-6", { "opacity-50 pointer-events-none": deleted }, className)}>
      <CartItemDetailsImage src={imageUrl} />

      <div className='flex-1'>
        <CartItemInfo name={name} details={details} />
        <hr className='my-3' />
        <div className='flex items-center justify-between'>
          <CountButton onClick={onClickCountButton} value={quantity} />
          <div className='flex items-center gap-3'>
            <CartItemDetailsPrice value={price} />
            <Trash2Icon onClick={onClickDeleteItem} className='text-gray-400 cursor-pointer hover:text-gray-600' size={16} />
          </div>
        </div>
      </div>
    </div>
  )
}