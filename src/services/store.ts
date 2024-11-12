import {ingredientsReducer} from "./ingredients/reducer.ts";
import {combineReducers, configureStore as createStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import {orderReducer} from "./order/reducer.ts";
import {StateModel} from "../utils/model.ts";
import {constructorReducer} from "./burger-constructor/reducer.ts";
import {currentIngredientReducer} from "./current-ingredient/reducer.ts";


export const initialState: StateModel = {
    ingredients: {
        allIngredients: []
    },
    currentIngredient: {model: null},
    burgerConstructor: {
        bun: null,
        ingredients: []
    },
};

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    currentIngredient: currentIngredientReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
});

export const configureStore = () => {
    return createStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(logger);
        }
    });
};


export const store = configureStore();


