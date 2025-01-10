import {createAction} from "@reduxjs/toolkit";

export const wsProfileConnect = createAction<string, 'profilefeed/connect'>('profilefeed/connect');
export const wsProfileDisconnect = createAction('profilefeed/disconnect');