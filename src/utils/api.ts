import {TUser} from "./model.ts";

const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const passwordReset = (data: { email: string }) => {
    return fetch(`${BURGER_API_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(checkResponse)
};

const passwordResetReset = (data: { password: string, token: string }) => {
    return fetch(`${BURGER_API_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(checkResponse)
};


const register = (data: { email: string, password: string, name: string }) => {
    return fetch(`${BURGER_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(checkResponse)
};


const login = (data: { email: string, password: string }) => {
    return fetch(`${BURGER_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then(checkResponse)
        .then((data: { success: boolean, accessToken: string, refreshToken: string, user: TUser}) => {
            if (!data.success) {
                return Promise.reject(data);
            }
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("accessToken", data.accessToken);
            return data;
        });
};


const logout = () => {
    const data = {token: localStorage.getItem("refreshToken")};
    return fetch(`${BURGER_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem("accessToken") ?? ""
        },
        body: JSON.stringify(data)
    })
        .then(checkResponse)
        .then((res) => {
            if (res.success) {
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
            } else {
                throw res;
            }
        })
};


const getUser = async (): Promise< { success: boolean, user: TUser }> => {
    try {
        return await fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
    } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        throw err;
    }
};


const patchUser = (data) => {
    return fetch(`${BURGER_API_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(checkResponse)
};

const refreshToken = () => {
    return fetch(`${BURGER_API_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    })
        .then(checkResponse)
        // !! Важно для обновления токена в мидлваре, чтобы запись
        // была тут, а не в fetchWithRefresh
        .then((refreshData: { success: boolean, accessToken: string, refreshToken: string }) => {
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            return refreshData;
        });
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
    try {
        if (options.headers) {
            options.headers["authorization"] = localStorage.getItem("accessToken");
        }
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            if (options.headers) {
                options.headers["authorization"] = refreshData.accessToken;
            }
            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const api = {
    passwordReset,
    passwordResetReset,
    login,
    logout,
    register,
    getUser,
    patchUser
}