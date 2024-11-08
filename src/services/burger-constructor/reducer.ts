import {ActionModel, ConstructorStateModel} from "../../utils/model.ts";
import {ADD_INGREDIENT, CLEAR_CONSTRUCTOR, REMOVE_INGREDIENT, UPDATE_BUN} from "./actions.ts";

const initialState: ConstructorStateModel = {
    bun: null,
    ingredients: []

}

export const constructorReducer = (state: ConstructorStateModel = initialState, action: ActionModel) => {
    switch (action.type) {
        case CLEAR_CONSTRUCTOR:
            return {
                ...state,
                bun: null,
                ingredients: [],
            };
        case UPDATE_BUN :
            return {
                ...state,
                bun: action.payload
            }
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, {...action.payload}]
            }
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients.filter(item => item !== action.payload)]
            }
        default:
            return state;
    }
};