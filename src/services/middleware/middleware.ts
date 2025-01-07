import {ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {api} from "../../utils/api.ts";

export type TWsActionTypes<S, R> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    sendMessage?: ActionCreatorWithPayload<S>;
    onConnecting?: ActionCreatorWithoutPayload;
    onOpen?: ActionCreatorWithoutPayload;
    onClose?: ActionCreatorWithoutPayload;
    onError?: ActionCreatorWithPayload<string>;
    onMessage?: ActionCreatorWithPayload<R>;
}

export const socketMiddleware = <S, R>(wsActions: TWsActionTypes<S, R>, withTokenRefresh: boolean = false): Middleware<NonNullable<unknown>, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        const {connect, disconnect, onConnecting, onOpen, onClose, onMessage, sendMessage, onError} = wsActions;
        let url = "";

        return (next) => (action) => {
            const {dispatch} = store;

            if (connect.match(action)) {
                socket = new WebSocket(action.payload);
                onConnecting && dispatch(onConnecting());
                url = action.payload;

                socket.onopen = () => {
                    onOpen && dispatch(onOpen());
                };

                socket.onerror = () => {
                    onError && dispatch(onError("Error"));
                };

                socket.onclose = () => {
                    onClose && dispatch(onClose());
                };

                socket.onmessage = (e) => {
                    const {data} = e;
                    try {
                        const parsedData = JSON.parse(data as string);

                        if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
                            api.refreshToken()
                                .then((refreshedData) => {
                                    const wsUrl = new URL(url);
                                    wsUrl.searchParams.set("token", refreshedData.accessToken.replace("Bearer ",""));
                                    dispatch(connect(wsUrl.toString()))
                                })
                                .catch(err => {
                                    onError && dispatch(onError((err as Error).message));
                                });

                            disconnect && dispatch(disconnect());

                            return;
                        }


                        onMessage && dispatch(onMessage(parsedData));
                    } catch (err) {
                        onError && dispatch(onError((err as Error).message));
                    }
                };

            }


            if (socket && sendMessage?.match(action)) {
                try {
                    socket.send(JSON.stringify(action.payload));
                } catch (err) {
                    onError && dispatch(onError((err as Error).message));
                }
            }

            if (socket && disconnect?.match(action)) {
                socket.close();
                socket = null;
            }

            next(action);
        }
    }
}