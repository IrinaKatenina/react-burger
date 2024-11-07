import {Dispatch} from "redux";
import {makeOrderRequest} from "../../utils/order-api.ts";
import {CLEAR_CONSTRUCTOR} from "../burger-constructor/actions.ts";

export const SET_ORDER = "SET_ORDER";
export const ORDER_LOADING = 'LOADING';
export const ORDER_ERROR = 'ERROR';

interface OrderResponse {
    name: string,
    order: {
        number: number
    },
    success: boolean
}

export const clearOrder = () => ({type: CLEAR_CONSTRUCTOR});

export const makeOrder = (data: { ingredients: Array<string> }) => (dispatch: Dispatch) => {
    dispatch({type: ORDER_LOADING});

    // dispatch({
    //     type: SET_ORDER,
    //     payload: FAKE_DATA.order.number
    // })

    makeOrderRequest(data)
        .then((resData: { data: OrderResponse }) => {
            console.log("!!!", data);

            dispatch({
                type: SET_ORDER,
                payload: resData.data.order.number
            })
        })
        .catch(err => {
            dispatch({type: ORDER_ERROR, payload: err.message});
            console.error('Could not load data', err);
        });
}

// const FAKE_DATA = {
//     "name": "Краторный метеоритный бургер",
//     "order": {
//         "number": 6257
//     },
//     "success": true
// };