import {ActionModel, OrderStateModel} from "../../utils/model.ts";
import {ORDER_ERROR, ORDER_LOADING, SET_ORDER} from "./actions.ts";

const initialState: OrderStateModel = {
    loading: false,
}

export const orderReducer = (state: OrderStateModel=initialState, action: ActionModel) => {
    switch (action.type) {
        case SET_ORDER:
            return {...state, order: {orderNumber: action.payload}};
        case ORDER_LOADING:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case ORDER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};