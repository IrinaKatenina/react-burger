export interface IngredientModel {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    key?: string
}

export interface IngredientsStateModel {
    allIngredients: IngredientModel[],
    loading?: boolean,
    error?: string
}

export interface ConstructorStateModel {
    bun: IngredientModel | null,
    ingredients: IngredientModel[]
}

export interface CurrentIngredientStateModel {
    currentIngredient: IngredientModel | null
}

export interface OrderStateModel {
    orderNumber?: string
    loading?: boolean,
    error?: string
}

export interface StateModel {
    ingredients: IngredientsStateModel,
    burgerConstructor: ConstructorStateModel,
    currentIngredient: CurrentIngredientStateModel,
    order?: OrderStateModel,
}

export interface ActionModel {
    type: string,
    payload?: any
}