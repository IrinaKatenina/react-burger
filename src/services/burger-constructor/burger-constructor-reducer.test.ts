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
                ...initialState,
                ingredients: [mainIngredient]
            }
        );

        expect(
            constructorReducer(
                {...initialState, bun: bunIngredient, ingredients: []},
                {
                    type: types.ADD_INGREDIENT,
                    payload: mainIngredient
                })
        ).toEqual(
            {
                ...initialState,
                bun: bunIngredient,
                ingredients: [mainIngredient]
            }
        );
    })

    it('should handle REMOVE_INGREDIENT', () => {
        expect(
            constructorReducer(
                {...initialState, ingredients: [mainIngredient]},
                {
                    type: types.REMOVE_INGREDIENT,
                    payload: mainIngredient
                })
        ).toEqual(
            {
                ...initialState,
                ingredients: []
            }
        );

        expect(
            constructorReducer(
                {...initialState, bun: bunIngredient, ingredients: [mainIngredient]},
                {
                    type: types.REMOVE_INGREDIENT,
                    payload: mainIngredient
                })
        ).toEqual(
            {
                ...initialState,
                bun: bunIngredient,
                ingredients: []
            }
        );
    })

    it('should handle MOVE_INGREDIENT', () => {
        const secondIngredient = {...mainIngredient, _id: '2'};
        expect(
            constructorReducer(
                {...initialState, ingredients: [secondIngredient, mainIngredient]},
                {
                    type: types.MOVE_INGREDIENT,
                    payload: {toIndex: 1, fromIndex: 0}
                })
        ).toEqual(
            {
                ...initialState,
                ingredients: [mainIngredient, secondIngredient]
            }
        );
    })

    it('should handle CLEAR_CONSTRUCTOR', () => {
        expect(
            constructorReducer(
                {...initialState, ingredients: [mainIngredient]},
                {type: types.CLEAR_CONSTRUCTOR})
        ).toEqual(
            {
                ...initialState
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
                ...initialState,
                bun: bunIngredient
            }
        );
    })

})