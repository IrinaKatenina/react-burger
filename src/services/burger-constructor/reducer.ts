import {ActionModel, ConstructorStateModel} from "../../utils/model.ts";
import {CLEAR_CONSTRUCTOR} from "./actions.ts";

const initialState: ConstructorStateModel = {
    constructorIngredients: {bun: null, ingredients: []},

}

export const constructorReducer = (state: ConstructorStateModel = initialState, action: ActionModel) => {
    switch (action.type) {
        case CLEAR_CONSTRUCTOR:
            return {
                ...state,
                constructorIngredients: {bun: null, ingredients: []},
            };

        default:
            return state;
    }
};