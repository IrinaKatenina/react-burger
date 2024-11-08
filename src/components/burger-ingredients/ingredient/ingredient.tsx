import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import clsx from "clsx";
import {IngredientModel} from "../../../utils/model";
import {useDrag} from "react-dnd";

export const Ingredient = (props: {
    ingredient: IngredientModel,
    count: number,
    onClick: (ingredient: IngredientModel) => void
}) => {
    const [{isDragging}, drag] = useDrag({
        type: props.ingredient.type === "bun" ? "bun" : "ingredient",
        item: props.ingredient,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const onClick = () => {
        props.onClick?.(props.ingredient);
    };

    const opacity = isDragging ? 0.4 : 1
    return (
        <div className={styles.container} onClick={onClick} ref={drag} style={{opacity}} data-testid={`ingredient`}>
            {!!props.count && <Counter count={props.count} size="default" extraClass="m-1"/>}
            <img className={'pl-4 pr-4'} src={props.ingredient.image} alt={props.ingredient.name}/>
            <div className={styles.price}>
                <p className={'text text_type_digits-default'}>{props.ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={clsx('text text_type_main-default', styles.name)}>{props.ingredient.name}</p>
        </div>
    );
};