import { cn } from '@/lib/utils'
import { CircleCheck } from 'lucide-react'
import React from 'react'

type Props = {
  imageUrl: string
  name: string
  price: number
  active?: boolean
  className?: string
  onClick?: () => void
}

export const Ingredient: React.FC<Props> = ({ name, price, imageUrl, active, className, onClick }) => {
  return (
    <div onClick={onClick} className={cn("flex items-center gap-1 flex-col p-1 pb-4 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white border border-transparent",
      { "border border-primary": active },
      className)}>
      {active && <CircleCheck className='absolute top-2 right-2 text-primary' />}
      <img className='' width={110} height={110} src={imageUrl} alt={name} />
      <span className='text-sm leading-[20px] mt-2'>{name}</span>
      <span className='mt-auto font-bold'>{price} ₽</span>
    </div>
  )
}