import {ActionModel, OrderModel, OrderStateModel} from "../../utils/model.ts";
import {CURRENT_ORDER_LOADED, ORDER_ERROR, ORDER_LOADED, ORDER_LOADING} from "./actions.ts";

const initialState: OrderStateModel = {
    orderNumber: undefined,
    loading: false,
    error: undefined,
    currentOrder: undefined,
}

export const orderReducer = (state: OrderStateModel = initialState, action: ActionModel) => {
    switch (action.type) {
        case ORDER_LOADED:
            return {
                ...state,
                orderNumber: action.payload,
                loading: false,
                error: undefined,
                currentOrder: undefined
            };
        case ORDER_LOADING:
            return {
                ...state,
                orderNumber: undefined,
                loading: true,
                error: undefined,
                currentOrder: undefined
            };
        case ORDER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                currentOrder: undefined
            };
        case CURRENT_ORDER_LOADED:
            return {
                ...state,
                currentOrder: action.payload as OrderModel,
            }
        default:
            return state;
    }
};