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
}

export interface OrderModel {
    orderNumber: string;
}

export interface StateModel {
    allIngredients: IngredientModel[],
    constructorIngredients: IngredientModel[],
    currentIngredient: IngredientModel | null,
    order: OrderModel | null,

    loading: boolean,
    error?: string
}