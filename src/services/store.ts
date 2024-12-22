import {ingredientsReducer} from "./ingredients/reducer.ts";
import {combineReducers, configureStore as createStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import {orderReducer} from "./order/reducer.ts";
import {StateModel} from "../utils/model.ts";
import {constructorReducer} from "./burger-constructor/reducer.ts";
import {userSlice} from "./user/slice.ts";


export const initialState: StateModel = {
    ingredients: {
        allIngredients: [],
        allIngredientsMap: new Map(),
    },
    burgerConstructor: {
        bun: null,
        ingredients: []
    },
};

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    [userSlice.reducerPath]: userSlice.reducer,
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
