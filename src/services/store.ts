import {ingredientsReducer} from "./ingredients/reducer.ts";
import {combineReducers, configureStore as createStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import {orderReducer} from "./order/reducer.ts";
import {StateModel} from "../utils/model.ts";
import {constructorReducer} from "./burger-constructor/reducer.ts";
import {userSlice} from "./user/slice.ts";
import {feedSlice, wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "./feed/slice.ts";
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from "react-redux";
import {socketMiddleware} from "./middleware/middleware.ts";
import {wsConnect, wsDisconnect} from "./feed/actions.ts";
import {
    profileFeedSlice,
    wsProfileClose, wsProfileConnecting,
    wsProfileError,
    wsProfileMessage,
    wsProfileOpen
} from "./profileFeed/slice.ts";
import {wsProfileConnect, wsProfileDisconnect} from "./profileFeed/actions.ts";


export const initialState: StateModel = {
    ingredients: {
        allIngredients: [],
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
    feed: feedSlice.reducer,
    profileFeed: profileFeedSlice.reducer,
});

const feedMiddleware = socketMiddleware({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage
});

const profileMiddleware = socketMiddleware({
    connect: wsProfileConnect,
    disconnect: wsProfileDisconnect,
    onConnecting: wsProfileConnecting,
    onOpen: wsProfileOpen,
    onClose: wsProfileClose,
    onError: wsProfileError,
    onMessage: wsProfileMessage
});

export const configureStore = () => {
    return createStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(logger, feedMiddleware,profileMiddleware);
        }
    });
};

export const store = configureStore();

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();