import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {OrderModel, WebsocketStatus} from "../../utils/model.ts";

export type FeedStore = {
    status: WebsocketStatus;
    feed: FeedResponse;
    error: string | null;
}

export type FeedResponse = {
    success: boolean;
    orders: OrderModel[];
    total: number;
    totalToday: number;
}

const initialState: FeedStore = {
    status: WebsocketStatus.OFFLINE,
    feed: {success: false, orders: [], total: 0, totalToday: 0},
    error: null,
}

export const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        wsConnecting: (state) => {
            state.status = WebsocketStatus.CONNECTING;
        },
        wsOpen: (state) => {
            state.status = WebsocketStatus.ONLINE
        },
        wsClose: (state) => {
            state.status = WebsocketStatus.OFFLINE
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        wsMessage: (state, action: PayloadAction<FeedResponse>) => {
            state.feed = action.payload;
        }
    },
    selectors: {
        getFeed: (state) => state.feed,
    },
});

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = feedSlice.actions;
export const {getFeed} = feedSlice.selectors;
