"use client";

import React, { useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CartDrawerItem } from './cart-drawer-item'
import { getCartItemDetails } from '@/lib/get-cart-item-details'
import { PizzaSize, PizzaType } from '../../../@types/pizza'
import toast from 'react-hot-toast';
import Image from "next/image";
import { Title } from './title';
import { useCart } from '../../../hooks/use-cart';

type Props = {
  className?: string
  children?: React.ReactNode
}

export const CartDrawer: React.FC<Props> = ({ className, children }) => {
  const { totalAmount, items, loading, updateItemQuantity, removeCartItem } = useCart();

  const updateQuantity = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);

    if (type === "minus") {
      setTimeout(() => {
        toast.success("Количество товара было успешно уменьшено");
      }, 3600);
    } else {
      setTimeout(() => {
        toast.success("Количество товара было успешно увеличено");
      }, 3600);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='flex flex-col justify-between pb-0 bg-[#f4f1ee]'>
        {totalAmount > 0 && (
          <>
            <SheetHeader>
              <SheetTitle>
                В корзине
                <span className='font-bold'> {items.length} {items.length === 1 ? "товар" : "товара"} </span>
              </SheetTitle>
            </SheetHeader>
            <div className='-mx-6 mt-5 overflow-auto flex-1 flex flex-col gap-2'>
              {items.map(item => (
                <CartDrawerItem
                  key={item.id}
                  id={1}
                  imageUrl={item.imageUrl}
                  details={item.pizzaSize && item.pizzaType && item.ingredients ? getCartItemDetails(item.pizzaType as PizzaType, item.pizzaSize as PizzaSize, item.ingredients) : ""}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  deleted={item.disabled}
                  onClickCountButton={(type) => updateQuantity(item.id, item.quantity, type)}
                  onClickDeleteItem={() => {
                    try {
                      removeCartItem(item.id);
                      setTimeout(() => {
                        toast.success("Товар был полностью удалён из корзины");
                      }, 3600);
                    } catch (error) {
                      toast.error("Не удалось удалить товар из корзины :(");
                    }
                  }}
                />
              ))}
            </div>
            {/* Items */}
            <SheetFooter className='-mx-6 -mt-[10px] bg-white p-8'>
              <div className='w-full'>
                <div className='flex mb-4'>
                  <span className='flex flex-1 text-lg text-neutral-500'>
                    Итого
                    <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'></div>
                  </span>
                  <span className='font-bold text-lg'>{totalAmount} ₽</span>
                </div>
                <Link href={"/checkout"}>
                  <Button className='w-full h-12 text-base' type='submit'>
                    Оформить заказ
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
        {totalAmount <= 0 && (
          <div className='flex flex-col items-center justify-center w-72 mx-auto h-[100vh]'>
            <Image src={'/assets/images/empty-box.png'} alt={'Empty cart image'} width={120} height={120} />
            <Title size='sm' text='Корзина пустая' className='text-center font-bold my-2' />
            <p className='text-center text-neutral-500 mb-5'>Добавьте хотя бы одну пиццу, чтобы совершить заказ</p>
            <SheetClose>
              <Button className='w-56 h-12 text-base' size={"sm"}>
                <ArrowLeft className='w-5 mr-2' />
                Вернуться назад
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}