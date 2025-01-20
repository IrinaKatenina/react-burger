import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login} from "./actions.ts";
import {TUser} from "../../utils/model.ts";

type TUserState = {
    user: TUser | null;
    isAuthChecked: boolean;
}

export const initialState: TUserState = {
    user: null,
    isAuthChecked: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload;
        },
        setUser: (state, action: PayloadAction<TUser | null>) => {
            state.user = action.payload;
        },
    },
    selectors: {
        getIsAuthChecked: (state) => state.isAuthChecked,
        getUser: (state) => state.user,
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(login.rejected, (state) => {
                state.user = null
            })
    }
});

export const {setUser, setIsAuthChecked} = userSlice.actions;
export const {getUser, getIsAuthChecked} = userSlice.selectors;