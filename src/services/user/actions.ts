import {api} from '../../utils/api.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {setIsAuthChecked, setUser} from "./slice.ts";
import {TUser} from "../../utils/model.ts";

export const login = createAsyncThunk(
    "user/login",
    async (form: { email: string, password: string }) => {
        const res = await api.login(form);
        return res.user;
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (_, {dispatch}) => {
        return api.logout()
            .then(() => {
                dispatch(setUser(null));
            });
    }
);

export const checkUserAuth = createAsyncThunk(
    "user/checkUserAuth",
    async (_, {dispatch}) => {
        if (localStorage.getItem('accessToken')) {
            void api.getUser()
                .then((res: { success: boolean, user: TUser }) => {
                    dispatch(setUser(res.user));
                })
                .finally(() => dispatch(setIsAuthChecked(true)))
        } else {
            dispatch(setIsAuthChecked(true))
        }
    }
)