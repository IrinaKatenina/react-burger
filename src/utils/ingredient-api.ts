import {IngredientModel} from "./model.ts";

const URL = 'https://norma.nomoreparties.space/api/ingredients';

export const getAllIngredients = () => {
    return fetch(URL)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
};

export const countPrice = (ingredients: IngredientModel[]) => {
    return ingredients.reduce((acc, item) => acc + (item.price * (item.count || 1)), 0);
}