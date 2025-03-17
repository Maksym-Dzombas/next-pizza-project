import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string
  sortBy?: string
  sizes?: string
  pizzaTypes?: string
  ingredients?: string
  priceFrom?: string
  priceTo?: string
}

const pizzaSizesMap: Record<number, number> = {
  1: 20,
  2: 30,
  3: 40,
  4: 50
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzasOnSorting = async (searchParams: Promise<GetSearchParams>) => {
  const searchParamsAwait = await searchParams;
  const sizes = searchParamsAwait.sizes?.split(",").map(pizzaSize => pizzaSizesMap[Number(pizzaSize)]);
  const pizzaTypes = searchParamsAwait.pizzaTypes?.split(",").map(Number);
  const ingredientIds = searchParamsAwait.ingredients?.split(",").map(Number);

  const minPrice = Number(searchParamsAwait.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(searchParamsAwait.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        where: {
          ingredients: ingredientIds ? {
            some: {
              id: {
                in: ingredientIds
              }
            }
          } : undefined,
          variations: {
            some: {
              size: {
                in: sizes
              },
              pizzaType: {
                in: pizzaTypes
              },
              price: {
                gte: minPrice,
                lte: maxPrice
              }
            },
          },
        },
        include: {
          ingredients: true,
          variations: {
            orderBy: {
              price: "asc"
            }
          }
        }
      }
    }
  });

  return categories;
};