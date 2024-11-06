import {ERROR, LOADING, SET_ALL_INGREDIENTS, SET_CURRENT_INGREDIENT} from "./actions.tsx";
import {IngredientModel, StateModel} from "../utils/model.ts";

export const initialState: StateModel = {
    allIngredients: [],
    constructorIngredients: [],
    currentIngredient: null,
    order: {orderNumber: "034536"},
    loading: false,
    error: undefined
};

interface ActionModel {
    type: string,
    payload?: any
}

export const rootReducer = (state: StateModel = initialState, action: ActionModel) => {
    switch (action.type) {
        case SET_ALL_INGREDIENTS:
            return {
                ...state,
                allIngredients: [...action.payload as Array<IngredientModel>],
                constructorIngredients: [(action.payload as Array<IngredientModel>).find(i => i.type === 'bun')],
                loading: false,
                error: undefined
            };
        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.payload as IngredientModel | null,
            };
        case LOADING:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};