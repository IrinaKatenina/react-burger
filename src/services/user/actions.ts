import {api} from '../../utils/api.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {setIsAuthChecked, setUser} from "./slice.ts";

export const login = createAsyncThunk(
    "user/login",
    async (form: { email: string, password: string }) => {
        return api.login(form)
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        return api.logout()
    }
);

export const checkUserAuth = createAsyncThunk(
    "user/checkUserAuth",
    async (_, {dispatch}) => {
        if (localStorage.getItem('accessToken')) {
            api.getUser()
                .then(res => {
                    console.log("!!!!!", res);
                    dispatch(setUser(res.user));
                })
                .finally(() => dispatch(setIsAuthChecked(true)))
                .catch(err => {
                });
        } else {
            dispatch(setIsAuthChecked(true))
        }
    }
)