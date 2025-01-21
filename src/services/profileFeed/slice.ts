import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {OrderModel, WebsocketStatus} from "../../utils/model.ts";

export type ProfileFeedStore = {
    status: WebsocketStatus;
    feed: ProfileFeedResponse;
    error: string | null;
}

export type ProfileFeedResponse = {
    success: boolean;
    orders: OrderModel[];
    total: number;
    totalToday: number;
}

export const initialState: ProfileFeedStore = {
    status: WebsocketStatus.OFFLINE,
    feed: {success: false, orders: [], total: 0, totalToday: 0},
    error: null,
}

export const profileFeedSlice = createSlice({
    name: "profileFeed",
    initialState,
    reducers: {
        wsProfileConnecting: (state) => {
            state.status = WebsocketStatus.CONNECTING;
        },
        wsProfileOpen: (state) => {
            state.status = WebsocketStatus.ONLINE
        },
        wsProfileClose: (state) => {
            state.status = WebsocketStatus.OFFLINE
        },
        wsProfileError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        wsProfileMessage: (state, action: PayloadAction<ProfileFeedResponse>) => {
            state.feed = action.payload;
        }
    },
    selectors: {
        getProfileFeed: (state) => state.feed,
    },
});

export const {wsProfileConnecting, wsProfileOpen, wsProfileClose, wsProfileError, wsProfileMessage} = profileFeedSlice.actions;
export const {getProfileFeed} = profileFeedSlice.selectors;