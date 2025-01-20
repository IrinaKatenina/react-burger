import {feedSlice, initialState} from './slice.ts'
import {WebsocketStatus} from "../../utils/model.ts";

describe('feed reducer', () => {

    it('should return the initial state', () => {
        expect(feedSlice.reducer(undefined, {type: ''})).toEqual(
            initialState
        )
    })

    it('should update status - wsConnecting', () => {
        const nextState = feedSlice.reducer(
            initialState,
            feedSlice.actions.wsConnecting()
        );
        expect(nextState.status).toBe(WebsocketStatus.CONNECTING);
    });

    it('should update status - wsOpen', () => {
        const nextState = feedSlice.reducer(
            initialState,
            feedSlice.actions.wsOpen()
        );
        expect(nextState.status).toBe(WebsocketStatus.ONLINE);
    });

    it('should update status - wsClose', () => {
        const nextState = feedSlice.reducer(
            initialState,
            feedSlice.actions.wsClose()
        );
        expect(nextState.status).toBe(WebsocketStatus.OFFLINE);
    });

    it('should set error -  wsError', () => {
        const errorMessage = 'Ошибка соединения';
        const nextState = feedSlice.reducer(
            initialState,
            feedSlice.actions.wsError(errorMessage)
        );

        expect(nextState.error).toBe(errorMessage);
    });

    it('should update feed - wsMessage', () => {
        const feedData = {
            success: true,
            orders: [],
            total: 1,
            totalToday: 1
        };
        const nextState = feedSlice.reducer(
            initialState,
            feedSlice.actions.wsMessage(feedData)
        );

        expect(nextState.feed).toEqual(feedData);
    });
})