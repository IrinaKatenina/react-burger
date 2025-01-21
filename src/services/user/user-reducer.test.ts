import {initialState, userSlice} from './slice.ts'
import {login} from "./actions.ts";

describe('user reducer', () => {

    it('should return the initial state', () => {
        expect(userSlice.reducer(undefined, {type: ''})).toEqual(
            initialState
        )
    })

    it('should handle login.fulfilled', () => {
        const userModel = {email: "1", name: "n"};
        expect(
            userSlice.reducer(undefined, {type: login.fulfilled.type, payload: userModel})
        ).toEqual(
            {
                ...initialState,
                user: userModel,
                isAuthChecked: true,
            }
        );
    })

    it('should handle login.rejected', () => {
        expect(
            userSlice.reducer(undefined, {type: login.rejected.type})
        ).toEqual(
            {
                ...initialState,
                user: null,
                isAuthChecked: false,
            }
        );
    })


    it('should set state - setIsAuthChecked', () => {
        const nextState = userSlice.reducer(
            initialState,
            userSlice.actions.setIsAuthChecked(true)
        );

        expect(nextState.isAuthChecked).toBe(true);
    });

    it('should update feed - wsProfileMessage', () => {
        const user = {
            email: "1",
            name: "2",
        };
        const nextState = userSlice.reducer(
            initialState,
            userSlice.actions.setUser(user)
        );

        expect(nextState.user).toEqual(user);
    });

})