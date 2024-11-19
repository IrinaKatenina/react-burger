import {StateModel} from "../../utils/model.ts";

export const getIngredientById = (ingredientId: string | undefined) => (store: StateModel) => {
    return ingredientId ? store.ingredients.allIngredients.find(ingredient => ingredient._id === ingredientId): undefined
};