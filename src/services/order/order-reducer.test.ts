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
                orderNumber: "123456",
                loading: false,
                error: undefined,
                currentOrder: undefined,
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
                orderNumber: undefined,
                loading: true,
                error: undefined,
                currentOrder: undefined,
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
                orderNumber: undefined,
                loading: false,
                error: "error",
                currentOrder: undefined,
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
                orderNumber: undefined,
                loading: false,
                error: undefined,
                currentOrder: orderModel,
            }
        );
    })

})