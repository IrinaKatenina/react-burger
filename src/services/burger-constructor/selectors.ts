import {StateModel} from "../../utils/model.ts";

export const getConstructorIngredients = (store: StateModel) => store.burgerConstructor.constructorIngredients;