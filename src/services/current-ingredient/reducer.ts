import {ActionModel, CurrentIngredientStateModel, IngredientModel} from "../../utils/model.ts";
import {SET_CURRENT_INGREDIENT} from "../ingredients/actions.ts";

const initialState: CurrentIngredientStateModel = {
    currentIngredient: null,
}

export const currentIngredientReducer = (state: CurrentIngredientStateModel = initialState, action: ActionModel) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.payload as IngredientModel | null,
            };
        default:
            return state;
    }
};