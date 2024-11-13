import styles from "./ingredient-details.module.css";
import clsx from "clsx";
import {useSelector} from "react-redux";
import {getCurrentIngredient} from "../../../services/current-ingredient/selectors.ts";
import {useParams} from "react-router-dom";

export function IngredientDetails() {

    const {ingredientId} = useParams();
    // const modelByPath = useSelector(getIngredientById(ingredientId));
    const modelFromStore = useSelector(getCurrentIngredient);
    const model = /*modelByPath || */ modelFromStore;
    return (
        model && <div className={styles.container}>
            <img className={clsx('pl-4 pr-4 mb-4', styles.image)} src={model.image} alt={model.name}/>
            <p className={'text text_type_main-medium mb-8'}>{model.name}</p>
            <div className={styles.macronutrients}>
                <div className={styles.macronutrient}>
                    <p className={'text text_type_main-default text_color_inactive'}>Калории, ккал</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{model.calories}</p>
                </div>
                <div className={styles.macronutrient}>
                    <p className={'text text_type_main-default text_color_inactive'}>Белки, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{model.proteins}</p>
                </div>
                <div className={styles.macronutrient}>
                    <p className={'text text_type_main-default text_color_inactive'}>Жиры, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{model.fat}</p>
                </div>
                <div className={styles.macronutrient}>
                    <p className={'text text_type_main-default text_color_inactive'}>Углеводы, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{model.carbohydrates}</p>
                </div>
            </div>
        </div>
    );

}