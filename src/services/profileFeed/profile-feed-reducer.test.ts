import {initialState, profileFeedSlice} from './slice.ts'
import {WebsocketStatus} from "../../utils/model.ts";

describe('profile feed reducer', () => {

    it('should return the initial state', () => {
        expect(profileFeedSlice.reducer(undefined, {type: ''})).toEqual(
            initialState
        )
    })

    it('should update status - wsProfileConnecting', () => {
        const nextState = profileFeedSlice.reducer(
            initialState,
            profileFeedSlice.actions.wsProfileConnecting()
        );

        expect(nextState.status).toBe(WebsocketStatus.CONNECTING);
    });

    it('should update status -  wsProfileOpen', () => {
        const nextState = profileFeedSlice.reducer(
            initialState,
            profileFeedSlice.actions.wsProfileOpen()
        );

        expect(nextState.status).toBe(WebsocketStatus.ONLINE);
    });

    it('should update status -  wsProfileClose', () => {
        const nextState = profileFeedSlice.reducer(
            initialState,
            profileFeedSlice.actions.wsProfileClose()
        );

        expect(nextState.status).toBe(WebsocketStatus.OFFLINE);
    });

    it('should set error -  wsProfileError', () => {
        const errorMessage = 'Ошибка соединения';
        const nextState = profileFeedSlice.reducer(
            initialState,
            profileFeedSlice.actions.wsProfileError(errorMessage)
        );

        expect(nextState.error).toBe(errorMessage);
    });

    it('should update feed - wsProfileMessage', () => {
        const feedData = {
            success: true,
            orders: [],
            total: 1,
            totalToday: 1
        };
        const nextState = profileFeedSlice.reducer(
            initialState,
            profileFeedSlice.actions.wsProfileMessage(feedData)
        );

        expect(nextState.feed).toEqual(feedData);
    });
})