import {ingredientsReducer, initialState} from './reducer.ts'
import * as types from './actions.ts'

describe('ingredients reducer', () => {

    const mainIngredient = {
        _id: "1",
        __v: 1,
        name: '1',
        type: 'main',
        proteins: 2,
        carbohydrates: 3,
        fat: 4,
        calories: 5,
        price: 5,
        image: "",
        image_mobile: "",
        image_large: ""
    };

    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {type: ''})).toEqual(
            initialState
        )
    })

    it('should handle SET_ALL_INGREDIENTS', () => {
        expect(
            ingredientsReducer(
                initialState,
                {
                    type: types.SET_ALL_INGREDIENTS,
                    payload: [mainIngredient]
                })
        ).toEqual(
            {
                allIngredients: [mainIngredient],
                loading: false,
                error: undefined
            }
        );
    })

    it('should handle ALL_INGREDIENTS_LOADING', () => {
        expect(
            ingredientsReducer(
                initialState,
                {
                    type: types.ALL_INGREDIENTS_LOADING,
                })
        ).toEqual(
            {
                allIngredients: [],
                loading: true,
                error: undefined
            }
        );
    })

    it('should handle ALL_INGREDIENTS_ERROR', () => {
        expect(
            ingredientsReducer(
                initialState,
                {
                    type: types.ALL_INGREDIENTS_ERROR,
                    payload: 'error'
                })
        ).toEqual(
            {
                allIngredients: [],
                loading: false,
                error: 'error'
            }
        );
    })

})