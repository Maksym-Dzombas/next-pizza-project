import React from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import { useRouter } from "next/navigation";

type Params = {
  sizes: number[]
  pizzaTypes: number[]
  ingredients: number[]
  priceFrom?: number
  priceTo?: number
}

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const isMounted = React.useRef(false);
  const { priceFrom, priceTo } = filters.selectedPrices;

  React.useEffect(() => {
    if (isMounted.current) {
      const params: Params = {
        sizes: Array.from(filters.selectedSizes),
        pizzaTypes: Array.from(filters.selectedPizzaTypes),
        ingredients: Array.from(filters.selectedIngredients)
      };

      if (priceTo !== 0) {
        params.priceFrom = priceFrom
        params.priceTo = priceTo
      }

      const queryString = qs.stringify(params, { arrayFormat: "comma" });

      router.push(`?${queryString}`, { scroll: false });
    }

    isMounted.current = true;

  }, [filters.selectedIngredients, filters.selectedPizzaTypes, filters.selectedPrices, filters.selectedSizes, router]);
};