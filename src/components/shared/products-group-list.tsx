"use client";

import React from 'react'
import { useIntersection } from 'react-use'
import { Title } from './title'
import { ProductCard } from './product-card'
import { useCategoryStore } from '../../../store/category';
import { cn } from '@/lib/utils';
import { Category, ProductVariation } from '@prisma/client';
import { ProductWithRelations } from '../../../@types/prisma';

type Props = {
  scrollId: string
  products: any[]
  categoryId: number
  categoryNames: Category
  className?: string
}

export const ProductsGroupList: React.FC<Props> = ({ categoryNames, products, categoryId, className, scrollId }) => {
  const setActiveCategoryId = useCategoryStore(state => state.setActiveId);
  const intersectionRef = React.useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.7
  })

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection, categoryId])

  return (
    <div className={cn("mb-20", className)} ref={intersectionRef} id={String(categoryNames.name)}>
      <Title text={categoryNames.name} size='lg' className='font-extrabold mb-5' />
      <div className={"grid grid-cols-3 gap-[50px]"}>
        {products.map((product: ProductWithRelations, index) => (
          <ProductCard ingredients={product.ingredients.map(ingredient => ingredient.name).join(", ")} key={product.name + `-${index}`} id={product.id} name={product.name} imageUrl={product.imageUrl} price={Math.min(...product.variations.map((variationProduct: ProductVariation) => variationProduct.price))} />
        ))}
      </div>
    </div>
  )
}