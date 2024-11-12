const URL = 'https://norma.nomoreparties.space/api/orders';

export const makeOrderRequest = (data: { ingredients: Array<string> }) => {
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    })
};