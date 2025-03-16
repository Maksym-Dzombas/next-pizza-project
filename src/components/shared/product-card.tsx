"use client"

import Link from 'next/link'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  id: number
  name: string
  price: number
  imageUrl: string
  className?: string
  ingredients?: string
}

export const ProductCard: React.FC<Props> = ({ id, name, price, ingredients, imageUrl, className }) => {
  return (
    <Link href={`/product/${id}`}>
      <div className={cn("flex flex-col hover:scale-[calc(102/100)] transition-transform", className)}>
        <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
          <img className='w-[215px] h-[215px] object-cover rounded-3xl' src={imageUrl} alt={name} />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className='text-sm text-gray-400 mb-4'>{ingredients}</p>
        <div className='flex justify-between items-center mt-auto'>
          <span>
            от <b>{price} ₽</b>
          </span>
          <Button variant={"secondary"} className='text-base font-bold'>
            <Plus size={20} className='w-5 h-5 mr-1' />
            Добавить
          </Button>
        </div>
      </div>
    </Link>
  )
}