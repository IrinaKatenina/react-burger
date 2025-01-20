import {constructorReducer, initialState} from './reducer.ts'
import * as types from './actions.ts'

describe('constructor reducer', () => {

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
    const bunIngredient = {
        _id: "",
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
        expect(constructorReducer(undefined, {type: ''})).toEqual(
            initialState
        )
    })

    it('should handle ADD_INGREDIENT', () => {
        expect(
            constructorReducer(
                initialState,
                {
                    type: types.ADD_INGREDIENT,
                    payload: mainIngredient
                })
        ).toEqual(
            {
                bun: null,
                ingredients: [mainIngredient]
            }
        );

        expect(
            constructorReducer(
                {bun: bunIngredient, ingredients: []},
                {
                    type: types.ADD_INGREDIENT,
                    payload: mainIngredient
                })
        ).toEqual(
            {
                bun: bunIngredient,
                ingredients: [mainIngredient]
            }
        );
    })

    it('should handle REMOVE_INGREDIENT', () => {
        expect(
            constructorReducer(
                {bun: null, ingredients: [mainIngredient]},
                {
                    type: types.REMOVE_INGREDIENT,
                    payload: mainIngredient
                })
        ).toEqual(
            {
                bun: null,
                ingredients: []
            }
        );

        expect(
            constructorReducer(
                {bun: bunIngredient, ingredients: [mainIngredient]},
                {
                    type: types.REMOVE_INGREDIENT,
                    payload: mainIngredient
                })
        ).toEqual(
            {
                bun: bunIngredient,
                ingredients: []
            }
        );
    })

    it('should handle MOVE_INGREDIENT', () => {
        const secondIngredient = {...mainIngredient, _id:'2'};
        expect(
            constructorReducer(
                {bun: null, ingredients: [secondIngredient,mainIngredient]},
                {
                    type: types.MOVE_INGREDIENT,
                    payload: {toIndex: 1, fromIndex: 0}
                })
        ).toEqual(
            {
                bun: null,
                ingredients: [mainIngredient, secondIngredient]
            }
        );
    })

    it('should handle CLEAR_CONSTRUCTOR', () => {
        expect(
            constructorReducer(
                {bun: null, ingredients: [ mainIngredient]},
                {type: types.CLEAR_CONSTRUCTOR})
        ).toEqual(
            {
                bun: null,
                ingredients: []
            }
        );
    })

    it('should handle UPDATE_BUN', () => {
        expect(
            constructorReducer(
                initialState,
                {type: types.UPDATE_BUN, payload: bunIngredient})
        ).toEqual(
            {
                bun: bunIngredient,
                ingredients: []
            }
        );
    })

})