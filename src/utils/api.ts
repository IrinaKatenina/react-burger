import {
    LoginResponse,
    PasswordResetResponse,
    RefreshTokenResponse,
    RegisterResponse, UserRequest,
    UserResponse,
    UserSaveResponse
} from "./model.ts";

const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() as Promise<T> : res.json().then((err) => Promise.reject(err));
};

const passwordReset = (data: { email: string }): Promise<PasswordResetResponse> => {
    return fetch(`${BURGER_API_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(checkResponse<PasswordResetResponse>)
};

const passwordResetReset = (data: { password: string, token: string }): Promise<PasswordResetResponse> => {
    return fetch(`${BURGER_API_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(checkResponse<PasswordResetResponse>)
};

const register = (data: { email: string, password: string, name: string }) => {
    return fetch(`${BURGER_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(checkResponse<RegisterResponse>)
};


const login = (data: { email: string, password: string }) => {
    return fetch(`${BURGER_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then(checkResponse<LoginResponse>)
        .then((data: LoginResponse) => {
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
        .then(checkResponse<{ success: boolean }>)
        .then((res: { success: boolean }) => {
            if (res.success) {
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
            } else {
                throw res;
            }
        })
};


const getUser = async (): Promise<UserResponse> => {
    try {
        return await fetchWithRefresh<UserResponse>(`${BURGER_API_URL}/auth/user`, {
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

const patchUser = (data: UserRequest): Promise<UserSaveResponse> => {
    return fetch(`${BURGER_API_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem("accessToken") ?? ""
        },
        body: JSON.stringify(data)
    }).then(checkResponse<UserSaveResponse>)
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
        .then(checkResponse<RefreshTokenResponse>)
        // !! Важно для обновления токена в мидлваре, чтобы запись
        // была тут, а не в fetchWithRefresh
        .then((refreshData: RefreshTokenResponse) => {
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            return refreshData;
        });
};

export const fetchWithRefresh = async <T>(url: string, options: RequestInit): Promise<T> => {
    try {
        options.headers = options.headers || {};
        (options.headers as Record<string, string>)["authorization"] = localStorage.getItem("accessToken") || "";

        const res = await fetch(url, options);
        return await checkResponse<T>(res);
    } catch (err) {
        if (err instanceof Error && err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен

            options.headers = options.headers || {};
            (options.headers as Record<string, string>)["authorization"] = refreshData.accessToken || "";

            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse<T>(res);
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