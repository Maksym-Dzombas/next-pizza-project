"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui/button'
import { Ingredient as IngredientType, ProductVariation } from '@prisma/client'
import { PizzaImage } from './pizza-image'
import { GroupVariants } from './group-variants'
import { mapPizzaType, pizzaSizes, pizzaTypes } from '../../../constants/pizza'
import { PizzaSize, PizzaType } from '../../../@types/pizza'
import { Ingredient } from './ingredient'
import { useSet } from 'react-use'
import { calcTotalPricePizza } from '@/lib/calc-total-price-pizza'

type Props = {
  isProductPage?: boolean
  loading?: boolean
  imageUrl: string
  name: string
  ingredients: IngredientType[]
  variations: ProductVariation[]
  className?: string
  onClickAddCart: (variationProductId: number, ingredients: number[]) => void
}

export const ChoosePizzaForm: React.FC<Props> = ({ isProductPage, loading, name, imageUrl, ingredients, variations, className, onClickAddCart }) => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));
  const { pizzaPrice, totalIngredientsPrice } = calcTotalPricePizza(type, size, variations, ingredients, selectedIngredients);
  const totalPrice = pizzaPrice as number + totalIngredientsPrice;
  const variationProductId = variations.find(variation => variation.pizzaType === type && variation.size === size)?.id;

  const availablePizzaSizesDependOnType = variations.filter(variation => variation.pizzaType === type);
  const availablePizzaSizesForUse = pizzaSizes.map(size => ({
    name: size.name,
    value: size.value,
    disabled: !availablePizzaSizesDependOnType.some(pizza => pizza.size === Number(size.value))
  }))
  const isOneAvailablePizzaSize = availablePizzaSizesForUse.some(size => size.disabled !== true);
  const textDetails = isOneAvailablePizzaSize ?
    `${size} см, ${mapPizzaType[type]} тесто` :
    `Для этого типа теста - этой пиццы (${name}), нету в наявности размера.`;

  const handleClickAdd = () => {
    if (variationProductId) onClickAddCart(variationProductId, Array.from(selectedIngredients));
  }

  React.useEffect(() => {
    const firstAvailableSizeOnChangeType = availablePizzaSizesForUse.find(pizza => pizza.disabled !== true);
    const isAvailableTheSizeOnChangeType = availablePizzaSizesForUse.find(pizza => Number(pizza.value) === size && pizza.disabled !== true);

    if (Boolean(!isAvailableTheSizeOnChangeType) && firstAvailableSizeOnChangeType) setSize(Number(firstAvailableSizeOnChangeType.value) as PizzaSize);
  }, [type]);

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage src={imageUrl} alt={name} size={size} />

      <div className={cn('w-[490px] bg-[#fffaf5] p-7', { "rounded-2xl": isProductPage })}>
        <Title text={name} size='md' className='font-extrabold mb-1' />
        <p className='text-gray-400'>{textDetails}</p>
        <div className='flex flex-col gap-1 mt-5 pb-[10px]'>
          <GroupVariants items={availablePizzaSizesForUse} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)} />
          <GroupVariants items={pizzaTypes} value={String(type)} onClick={value => setType(Number(value) as PizzaType)} />
        </div>
        <div className='bg-[#fffaf5] py-5 px-3 h-[320px] overflow-auto scrollbar'>
          <div className='grid grid-cols-3 gap-2'>
            {ingredients.map((ingredient, index) => (
              <Ingredient
                key={name + " - " + index}
                name={ingredient.name}
                imageUrl={ingredient.imageUrl}
                price={ingredient.price}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className='h-[55px] px-10 text-base rounded-[18px] w-full mt-5'
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}