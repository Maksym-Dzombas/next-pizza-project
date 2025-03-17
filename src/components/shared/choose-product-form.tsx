import { cn } from '@/lib/utils'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui/button'
import { ProductVariation } from '@prisma/client'
import { useCartStore } from '../../../store/cart'

type Props = {
  isProductPage?: boolean
  loading?: boolean
  price: number
  imageUrl: string
  name: string
  variations: ProductVariation[]
  className?: string
  onClickAddCart: (variationProductId: number) => void
}

export const ChooseProductForm: React.FC<Props> = ({ isProductPage, loading, name, price, imageUrl, variations, className, onClickAddCart }) => {
  const isLoadingAddToCart = useCartStore(state => state.loading);
  // let isSuccessAddProduct = useCartStore(state => state.isSuccessAddProduct);

  const handleClickAdd = () => {
    onClickAddCart(variations[0].id);
  }

  return (
    <div className={cn("flex flex-1", className)}>
      <div className='flex items-center justify-center flex-1 relative w-full'>
        <img className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]' src={imageUrl} alt={name} />
      </div>
      <div className={cn('flex flex-col w-[490px] bg-[#f7f6f5] p-7', { "rounded-2xl": isProductPage })}>
        <Title text={name} size='md' className='font-extrabold mb-1' />
        <Button loading={loading} onClick={handleClickAdd}
          className='h-[55px] mt-auto px-10 text-base rounded-[18px] w-full'
        >
          {isLoadingAddToCart ? "Добавление в корзину, ожидайте..." : `Добавить в корзину за ${price} ₽`}
        </Button>
      </div>
    </div>
  )
}