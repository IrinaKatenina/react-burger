import {ALL_INGREDIENTS_ERROR, ALL_INGREDIENTS_LOADING, SET_ALL_INGREDIENTS} from "./actions.ts";
import {ActionModel, IngredientModel, IngredientsStateModel} from "../../utils/model.ts";

const initialState: IngredientsStateModel = {
    allIngredients: [],
    allIngredientsMap: new Map<string, IngredientModel>(),
    loading: false,
    error: undefined
}
export const ingredientsReducer = (state: IngredientsStateModel = initialState, action: ActionModel) => {
    switch (action.type) {
        case SET_ALL_INGREDIENTS: {
            const allIngredientsMap = (action.payload as Array<IngredientModel>)
                .reduce((map, ingredient) =>
                    map.set(ingredient._id, ingredient), new Map<string, IngredientModel>());
            return {
                ...state,
                allIngredients: [...action.payload as Array<IngredientModel>],
                allIngredientsMap: allIngredientsMap,
                loading: false,
                error: undefined
            };
        }
        case ALL_INGREDIENTS_LOADING:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case ALL_INGREDIENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};