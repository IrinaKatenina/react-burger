import React from "react";
import {Ingredient} from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css";
import clsx from "clsx";

interface Props {
    onClick?: () => void,
    title: string
    items: any[];
}

export const IngredientList = (props: Props) => {

    return (
        <>
            <p className={'text text_type_main-medium'}>{props.title}</p>
            <ul className={clsx('pl-4 pr-4', styles.list)}>
                {props.items.map(item => (
                    <li key={item._id}>
                        <Ingredient {...item}></Ingredient>
                    </li>
                ))}
            </ul>
        </>
    );
};