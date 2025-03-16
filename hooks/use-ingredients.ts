"use client"

import React from "react";
import { Ingredient } from "@prisma/client";
import ApiClient from "../services/api-client";

interface ReturnProps {
  ingredients: Ingredient[]
  ingredientsFilter: Pick<Ingredient, "id" | "name">[]
  isLoading: boolean
}

export const useIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [ingredientsFilter, setIngredientsFilter] = React.useState<Pick<Ingredient, "id" | "name">[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    ApiClient.ingredients.getAll().then((data) => {
      setIsLoading(true);
      setIngredients(data);
      setIngredientsFilter(data.map(ingredient => ({ id: ingredient.id, name: ingredient.name })));
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
    }).finally(() => {
      setTimeout(() => setIsLoading(false), 400)
    });
  }, []);

  return { ingredients, ingredientsFilter, isLoading };
};