import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import clsx from "clsx";
import {IngredientModel} from "../../../utils/model";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";

export const Ingredient = (props: {
    ingredient: IngredientModel,
    count: number,
}) => {
    const location = useLocation();

    const [{isDragging}, drag] = useDrag({
        type: props.ingredient.type === "bun" ? "bun" : "ingredient",
        item: props.ingredient,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1
    return (
        <Link key={props.ingredient._id}
              to={`/ingredients/${props.ingredient._id}`}
              state={{background: location}}
              className={styles.link}>
            <div className={styles.container} ref={drag} style={{opacity}} data-testid={`ingredient`}>
                {!!props.count && <Counter count={props.count} size="default" extraClass="m-1"/>}
                <img className={'pl-4 pr-4'} src={props.ingredient.image} alt={props.ingredient.name}/>
                <div className={styles.price}>
                    <p className={'text text_type_digits-default'}>{props.ingredient.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={clsx('text text_type_main-default', styles.name)}>{props.ingredient.name}</p>
            </div>
        </Link>
    );
};