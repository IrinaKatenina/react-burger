import {fetchWithRefresh} from "./api.ts";

const URL = 'https://norma.nomoreparties.space/api/orders';

export const makeOrderRequest = (data: { ingredients: Array<string> }) => {
    return fetchWithRefresh(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
};