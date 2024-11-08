import {ActionModel, OrderStateModel} from "../../utils/model.ts";
import {ORDER_ERROR, ORDER_LOADED, ORDER_LOADING} from "./actions.ts";

const initialState: OrderStateModel = {
    orderNumber: undefined,
    loading: false,
    error: undefined,
}

export const orderReducer = (state: OrderStateModel = initialState, action: ActionModel) => {
    switch (action.type) {
        case ORDER_LOADED:
            return {
                ...state,
                orderNumber: action.payload,
                loading: false,
                error:
                undefined
            };
        case
        ORDER_LOADING:
            return {
                ...state,
                orderNumber: undefined,
                loading: true,
                error: undefined
            };
        case
        ORDER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};