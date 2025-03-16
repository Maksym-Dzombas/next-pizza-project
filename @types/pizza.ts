import { mapPizzaSize, mapPizzaType } from "../constants/pizza";

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;