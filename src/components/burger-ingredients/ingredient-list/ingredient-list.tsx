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

export const IngredientList = forwardRef((props: Props, ref: ForwardedRef<HTMLParagraphElement>) => {

    return (
        <>
            <p className={'text text_type_main-medium'} ref={ref}>{props.title}</p>
            <ul className={clsx('pl-4 pr-4', styles.list)}>
                {props.items.map(ingredient => (
                    <li key={ingredient._id}>
                        <Ingredient ingredient={ingredient} onClick={props.onIngredientClick}></Ingredient>
                    </li>
                ))}
            </ul>
        </>
    );
});