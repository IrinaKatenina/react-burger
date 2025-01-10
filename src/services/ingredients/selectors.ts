import {StateModel} from "../../utils/model.ts";
import {createSelector} from "@reduxjs/toolkit";

export const hasAllIngredientsData = (store: StateModel) => !!store.ingredients.allIngredients?.length;
export const getAllIngredients = (store: StateModel) => store.ingredients.allIngredients;
export const isLoading = (store: StateModel) => store.ingredients.loading;
export const getError = (store: StateModel) => store.ingredients.error;

export const getIngredientsByType = createSelector([
        (state: StateModel) => state.ingredients.allIngredients
    ],
    (allIngredients) => {
        const buns = allIngredients.filter(item => item.type === 'bun');
        const sauces = allIngredients.filter(item => item.type === 'sauce');
        const mains = allIngredients.filter(item => item.type === 'main');
        return {buns, sauces, mains};
    }
);