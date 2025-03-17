"use client";

import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useClickAway, useDebounce } from 'react-use';
import ApiClient from '../../../services/api-client';
import { ProductWithRelations } from '../../../@types/prisma';
import { ProductVariation } from '@prisma/client';

type Props = {
  className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [products, setProducts] = React.useState<ProductWithRelations[]>([]);
  const [focused, setFocused] = React.useState(false);
  const ref = React.useRef(null);

  const onClickItem = () => {
    setFocused(false);
    setSearchValue("");
  }

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(() => {
    ApiClient.products.search(searchValue).then((products) => setProducts(products as ProductWithRelations[]));
  }, 300, [searchValue]);

  return (
    <>
      {focused && <div className='fixed inset-0 bg-black/50 z-30'></div>}
      <div ref={ref} className={cn("flex rounded-2xl justify-between relative h-11 flex-1 mx-10 z-30", className)}>
        <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
        <input onChange={(event) => setSearchValue(event?.target.value)} value={searchValue} onFocus={() => setFocused(true)} className="rounded-2xl outline-none w-full bg-gray-100 pl-11" type="text" placeholder='Найти пиццу' />

        <div className={cn("absolute w-full bg-white rounded-xl p-2 top-14 shadow-md transition-all duration-300  invisible opacity-0 z-30", focused && "visible opacity-100 top-12")}>
          {
            products.length > 0 ? products.map((product) => (
              <Link onClick={onClickItem} key={product.id} className='flex items-center rounded-sm gap-3 hover:bg-primary/30 duration-100 p-1 pr-3' href={"/product/" + product.id}>
                <img className='w-14 h-14 object-cover rounded-2xl' src={product.imageUrl} alt={product.name} />
                <span>{product.name}</span>
                <span className='ml-auto font-bold'>от {product.variations.map((variation: ProductVariation) => Math.min(variation.price))} ₽</span>
              </Link>
            )) : <p>Подобных продуктов не найдено :(</p>
          }
        </div>
      </div>
    </>
  )
}