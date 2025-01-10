import {Dispatch} from "redux";
import {makeOrderGetOrderByNumber, makeOrderRequest} from "../../utils/order-api.ts";
import {CLEAR_CONSTRUCTOR} from "../burger-constructor/actions.ts";
import { OrderResponse} from "../../utils/model.ts";
import {FeedResponse} from "../feed/slice.ts";

export const ORDER_LOADED = "SET_ORDER";
export const ORDER_LOADING = 'LOADING';
export const ORDER_ERROR = 'ERROR';
export const CURRENT_ORDER_LOADED = 'CURRENT_ORDER_LOADED';


export const clearOrder = () => ({type: CLEAR_CONSTRUCTOR});

export const makeOrder = (data: { ingredients: Array<string> }) => (dispatch: Dispatch) => {
    dispatch({type: ORDER_LOADING});

    makeOrderRequest(data)
        .then((resData: OrderResponse) => {
            dispatch({
                type: ORDER_LOADED,
                payload: resData.order.number
            })
        })
        .catch(err => {
            dispatch({type: ORDER_ERROR, payload: err.message});
            console.error('Could not load data', err);
        });
}

export const getOrderByNumber = (number: string) => (dispatch: Dispatch) => {
    makeOrderGetOrderByNumber(number)
        .then((resData: FeedResponse ) => {
            dispatch({
                type: CURRENT_ORDER_LOADED,
                payload: resData.orders[0]
            })
        })
        .catch(err => {
            dispatch({type: ORDER_ERROR, payload: err.message});
            console.error('Could not load data', err);
        });
}
