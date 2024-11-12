import {StateModel} from "../../utils/model.ts";

export const getOrderNumber = (state: StateModel) => state.order?.orderNumber;

export const isLoading = (store: StateModel) => store.order?.loading;
export const getError = (store: StateModel) => store.order?.error;