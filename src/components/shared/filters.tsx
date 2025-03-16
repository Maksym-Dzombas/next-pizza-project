"use client";

import React from 'react';
import { Title } from './title';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import { CheckBoxFiltersGroup } from './checkbox-filters-groups';
import { handlePizzaSizeClick } from '@/utils/adapters/checkboxAdapters';
import { useQueryFilters, useIngredients, useFilters } from '../../../hooks/index';

type Props = {
  className?: string
}

const rangeSliderInitial = {
  priceFrom: 0,
  priceTo: 1000
}

export const Filters: React.FC<Props> = ({ className }) => {
  const {
    selectedIngredients, selectedPizzaTypes, selectedPrices, selectedSizes,
    setIngredients, setPizzaTypes, setPrices, setSizes
  } = useFilters();
  const { ingredientsFilter, isLoading } = useIngredients();
  useQueryFilters({ selectedIngredients, selectedPizzaTypes, selectedPrices, selectedSizes });

  return (
    <div className={className}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />
      <CheckBoxFiltersGroup selectedValues={selectedPizzaTypes} onClickCheckbox={setPizzaTypes} title='Тип теста' className='mb-5' items={[
        { name: "Тонкое", value: "1", id: 1 },
        { name: "Традиционное", value: "1", id: 2 },
      ]} />
      <CheckBoxFiltersGroup selectedValues={selectedSizes} onClickCheckbox={(id) => handlePizzaSizeClick(id, setSizes)} title='Размеры' className='mb-5' items={[
        { name: "20 см", value: "20", id: 1 },
        { name: "30 см", value: "30", id: 2 },
        { name: "40 см", value: "40", id: 3 },
        { name: "50 см", value: "50", id: 4 },
      ]} />
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            min={rangeSliderInitial.priceFrom}
            max={rangeSliderInitial.priceTo}
            placeholder="0"
            value={String(selectedPrices.priceFrom)}
            onChange={(event) => setPrices("priceFrom", Number(event.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={rangeSliderInitial.priceTo}
            placeholder="1000"
            value={String(selectedPrices.priceTo)}
            onChange={(event) => setPrices("priceTo", Number(event.target.value))}
          />
        </div>
        <RangeSlider min={rangeSliderInitial.priceFrom} max={rangeSliderInitial.priceTo} step={10} value={[selectedPrices.priceFrom || rangeSliderInitial.priceFrom, selectedPrices.priceTo || rangeSliderInitial.priceTo]} onValueChange={([from, to]) => {
          setPrices("priceFrom", from);
          setPrices("priceTo", to);
        }} />
        <CheckBoxFiltersGroup onClickCheckbox={setIngredients} loading={isLoading} title='Ингредиенты' className='mt-14 flex flex-col' limit={5}
          items={ingredientsFilter} selectedValues={selectedIngredients} />
      </div>
    </div>
  )
}