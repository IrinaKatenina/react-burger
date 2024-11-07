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