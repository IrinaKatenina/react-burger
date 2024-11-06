import {IngredientModel} from "../utils/model.ts";
import {Dispatch} from "redux";
import {getAllIngredients} from "../utils/ingredient-api.tsx";

export const SET_ALL_INGREDIENTS = 'SET_ALL_INGREDIENTS';
export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';


export const loadAllIngredients = () => (dispatch: Dispatch) => {
    dispatch({type: LOADING});

    getAllIngredients()
        .then((resData: { data: Array<IngredientModel> }) => {
            dispatch({
                type: SET_ALL_INGREDIENTS,
                payload: resData.data ?? []
            })
        })
        .catch(err => {
            dispatch({type: ERROR, payload: err.message});
            console.error('Could not load data', err);
        });
}