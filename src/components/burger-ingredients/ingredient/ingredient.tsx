import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css';
import clsx from "clsx";

export const Ingredient = (props: any) => {

    return (
        <div className={styles.container}>
            <Counter count={1} size="default" extraClass="m-1"/>
            <img className={'pl-4 pr-4'} src={props.image} alt={props.name}/>
            <div className={styles.price}>
                <p className={'text text_type_digits-default'}>{props.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={clsx('text text_type_main-default', styles.name)}>{props.name}</p>
        </div>
    );
};