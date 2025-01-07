import {fetchWithRefresh} from "./api.ts";
import {OrderResponse} from "./model.ts";

const URL = 'https://norma.nomoreparties.space/api/orders';

export const makeOrderRequest = (data: { ingredients: Array<string> }): Promise<OrderResponse> => {
    return fetchWithRefresh(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
};


export const makeOrderGetOrderByNumber = (number: string) => {
    return fetch(URL+`/${number}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
};
