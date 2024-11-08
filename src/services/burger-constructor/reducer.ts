import {ActionModel, ConstructorStateModel} from "../../utils/model.ts";
import {ADD_INGREDIENT, CLEAR_CONSTRUCTOR, MOVE_INGREDIENT, REMOVE_INGREDIENT, UPDATE_BUN} from "./actions.ts";

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
                ingredients: [...state.ingredients, action.payload]
            }
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients.filter(item => item !== action.payload)]
            }
        case MOVE_INGREDIENT: {
            const ingredients = [...state.ingredients];
            ingredients.splice(+action.payload.toIndex, 0, ingredients.splice(+action.payload.fromIndex, 1)[0]);
            return {
                ...state,
                ingredients: ingredients
            };
        }
        default:
            return state;
    }
};