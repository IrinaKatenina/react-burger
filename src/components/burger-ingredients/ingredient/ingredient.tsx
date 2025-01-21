import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import clsx from "clsx";
import {IngredientModel} from "../../../utils/model";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import React from "react";

interface Props {
    ingredient: IngredientModel,
    count: number,
}

export const Ingredient = ({ingredient, count}: Props): React.JSX.Element => {
    const location = useLocation();

    const [{isDragging}, drag] = useDrag({
        type: ingredient.type === "bun" ? "bun" : "ingredient",
        item: ingredient,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1
    return (
        <Link key={ingredient._id}
              to={`/ingredients/${ingredient._id}`}
              state={{background: location}}
              className={styles.link}>
            <div className={styles.container} ref={drag} style={{opacity}} data-testid={ingredient.type=== "bun" ? "bun" : "ingredient"}>
                {!!count && <Counter count={count} size="default" extraClass="m-1"/>}
                <img className={'pl-4 pr-4'} src={ingredient.image} alt={ingredient.name}/>
                <div className={styles.price}>
                    <p className={'text text_type_digits-default'}>{ingredient.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={clsx('text text_type_main-default', styles.name)} data-testId="ingredient_name">{ingredient.name}</p>
            </div>
        </Link>
    );
};