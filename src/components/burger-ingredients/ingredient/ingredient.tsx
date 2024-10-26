import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import clsx from "clsx";
import {IngredientModel} from "../../../utils/model";

export const Ingredient = (props: {
    ingredient: IngredientModel,
    onClick: (ingredient: IngredientModel) => void
}) => {

    const onClick = () => {
        props.onClick?.(props.ingredient);
    };

    return (
        <div className={styles.container} onClick={onClick}>
            <Counter count={1} size="default" extraClass="m-1"/>
            <img className={'pl-4 pr-4'} src={props.ingredient.image} alt={props.ingredient.name}/>
            <div className={styles.price}>
                <p className={'text text_type_digits-default'}>{props.ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={clsx('text text_type_main-default', styles.name)}>{props.ingredient.name}</p>
        </div>
    );
};