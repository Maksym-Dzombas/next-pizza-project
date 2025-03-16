import { useSearchParams } from "next/navigation"
import React from "react"
import { useSet } from "react-use"

// Types
type PricesT = {
  priceFrom?: number
  priceTo?: number
}

interface QueryFilters extends PricesT {
  pizzaTypes: string
  sizes: string
  ingredients: string
}

export interface Filters {
  selectedIngredients: Set<number>
  selectedPrices: PricesT
  selectedSizes: Set<number>
  selectedPizzaTypes: Set<number>
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PricesT, value: number) => void
  setSizes: (key: number) => void
  setPizzaTypes: (key: number) => void
  setIngredients: (key: number) => void
}

// Hook
export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  // Фильтр ингредиентов
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<number>(searchParams.get("ingredients")?.split(",").map(id => Number(id))));

  // Фильтр цены
  const priceFrom = Number(searchParams.get("priceFrom") === "NaN" ? null : Number(searchParams.get("priceFrom")));
  const priceTo = Number(searchParams.get("priceTo") === "NaN" ? null : Number(searchParams.get("priceTo")));
  const [prices, setPrices] = React.useState<PricesT>({
    priceFrom: priceFrom,
    priceTo: priceTo
  });

  const updatePrice = (name: keyof PricesT, value: number) => {
    setPrices(prev => ({
      ...prev,
      [name]: value
    }))
  };

  // Фильтр размеров
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<number>(searchParams.has("sizes") ? searchParams.get("sizes")?.split(",").map(id => Number(id)) : []));

  // Фильтр типов пиццы
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<number>(searchParams.has("pizzaTypes") ? searchParams.get("pizzaTypes")?.split(",").map(id => Number(id)) : []));

  return React.useMemo(() => ({
    selectedIngredients,
    selectedPrices: prices,
    selectedSizes: sizes,
    selectedPizzaTypes: pizzaTypes,
    setPrices: updatePrice,
    setSizes: toggleSizes,
    setPizzaTypes: togglePizzaTypes,
    setIngredients: toggleIngredients
  }), [sizes, selectedIngredients, prices, pizzaTypes])
};