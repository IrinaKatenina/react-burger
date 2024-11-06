import {initialState, rootReducer} from "./rootReducer.tsx";
import {configureStore as createStore} from "@reduxjs/toolkit";
import logger from "redux-logger";

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
