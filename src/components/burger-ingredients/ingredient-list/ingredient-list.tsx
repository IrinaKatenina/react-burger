import {Ingredient} from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css";
import clsx from "clsx";
import {IngredientModel} from "../../../utils/model";
import {ForwardedRef, forwardRef} from "react";

interface Props {
    onClick?: () => void,
    title: string,
    items: IngredientModel[],
    onIngredientClick: (ingredient: IngredientModel) => void
}

export const IngredientList = forwardRef((props: Props, ref: ForwardedRef<HTMLUListElement>) => {

    return (
        <>
            <p className={'text text_type_main-medium'}>{props.title}</p>
            <ul className={clsx('pl-4 pr-4', styles.list)} ref={ref}>
                {props.items.map(ingredient => (
                    <li key={ingredient._id}>
                        <Ingredient ingredient={ingredient} onClick={props.onIngredientClick}></Ingredient>
                    </li>
                ))}
            </ul>
        </>
    );
});