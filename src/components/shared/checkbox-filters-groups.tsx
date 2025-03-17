"use client";

import React from 'react'
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

type Item = FilterChecboxProps;

type Props = {
  title: string
  items: Item[]
  limit?: number
  loading?: boolean
  searchInputPlaceholder?: string
  defaultValue?: string[]
  className?: string
  selectedValues?: Set<number | string>
  onClickCheckbox?: (id: number) => void
}

export const CheckBoxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  loading,
  className,
  selectedValues,
  onClickCheckbox
}) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [showAll, setShowAll] = React.useState(false);
  const list = showAll ? items : items.slice(0, limit);
  const listFilter = showAll ? list.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())) : list;

  if (loading) {
    return (
      <div className={cn("max-w-[258px]", className)}>
        <p className='font-bold mb-3'>{title}</p>
        <div className={cn("flex max-w-[258px] w-full flex-col gap-4 pr-36 max-h-80", showAll && "overflow-y-auto scrollbar pr-14")}>
          {
            ...Array.from({ length: limit }).map((_, index) => (
              <Skeleton key={index + "-skeleton"} className='h-6 w-[230%] mb-0 bg-gray-200' />
            ))
          }
        </div>
      </div>
    )
  }

  return (
    <div className={cn("max-w-[258px]", className)}>
      <p className='font-bold mb-3'>{title}</p>
      {
        showAll && <div className='mb-5'>
          <Input onChange={(event) => setSearchValue(event.target.value)} placeholder={searchInputPlaceholder} className="bg-gray-50 border-none" />
        </div>
      }
      <div className={cn("flex flex-col gap-4 pr-36 max-h-80 w-full", showAll && "overflow-y-auto scrollbar pr-32")}>
        {listFilter.map((item, index) => (
          <FilterCheckbox
            key={index}
            name={item.name}
            onCheckedChange={() => onClickCheckbox?.(item.id)}
            checked={selectedValues?.has(item.id)}
            id={item.id}
            endAdornment={item.endAdornment}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className='mt-auto'>
          <button onClick={() => setShowAll(!showAll)} className='text-primary hover:underline mt-6'>{showAll ? "Скрыть" : "+ Показать всё"}</button>
        </div>
      )}
    </div>
  )
}