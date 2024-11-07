import {IngredientModel} from "../../utils/model.ts";
import {SET_CURRENT_INGREDIENT} from "../ingredients/actions.ts";


export const setCurrentIngredient = (ingredient: IngredientModel | null) => {
    return {type: SET_CURRENT_INGREDIENT, payload: ingredient};
}