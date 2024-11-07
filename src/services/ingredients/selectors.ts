import {StateModel} from "../../utils/model.ts";

export const hasAllIngredientsData = (store: StateModel) => !!store.ingredients.allIngredients?.length;
export const getAllIngredients = (store: StateModel) => store.ingredients.allIngredients;
export const isLoading = (store: StateModel) => store.ingredients.loading;
export const getError = (store: StateModel) => store.ingredients.error;