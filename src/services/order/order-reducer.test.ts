import {orderReducer, initialState} from './reducer.ts'
import {OrderModel} from "../../utils/model.ts";
import * as types from './actions.ts'

describe('ingredients reducer', () => {

    it('should return the initial state', () => {
        expect(orderReducer(undefined, {type: ''})).toEqual(
            initialState
        )
    })

    it('should handle ORDER_LOADED', () => {
        expect(
            orderReducer(
                initialState,
                {
                    type: types.ORDER_LOADED,
                    payload: "123456"
                })
        ).toEqual(
            {
                ...initialState,
                orderNumber: "123456",
            }
        );
    })

    it('should handle ORDER_LOADING', () => {
        expect(
            orderReducer(
                initialState,
                {
                    type: types.ORDER_LOADING,
                })
        ).toEqual(
            {
                ...initialState,
                loading: true,
            }
        );
    })

    it('should handle ORDER_ERROR', () => {
        expect(
            orderReducer(
                initialState,
                {
                    type: types.ORDER_ERROR,
                    payload: "error"
                })
        ).toEqual(
            {
                ...initialState,
                error: "error",
            }
        );
    })

    it('should handle CURRENT_ORDER_LOADED', () => {
        const orderModel: OrderModel = {
            name: "order",
            _id: "123456",
            ingredients: [],
            status: "pending",
            number: 123456,
            createdAt: "date",
            updatedAt: "date"
        };

        expect(
            orderReducer(
                initialState,
                {
                    type: types.CURRENT_ORDER_LOADED,
                    payload: orderModel
                })
        ).toEqual(
            {
                ...initialState,
                orderNumber: undefined,
                currentOrder: orderModel,
            }
        );
    })

})