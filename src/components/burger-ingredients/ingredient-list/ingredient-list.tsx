import React from "react";
import {Ingredient} from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css";
import clsx from "clsx";
import {IngredientModel} from "../../../utils/model";

interface Props {
    onClick?: () => void,
    title: string
    items: IngredientModel[];
}

export const IngredientList = (props: Props) => {

    return (
        <>
            <p className={'text text_type_main-medium'}>{props.title}</p>
            <ul className={clsx('pl-4 pr-4', styles.list)}>
                {props.items.map(ingredient => (
                    <li key={ingredient._id}>
                        <Ingredient ingredient={ingredient}></Ingredient>
                    </li>
                ))}
            </ul>
        </>
    );
};