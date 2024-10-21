import React from 'react';
import styles from './burger-ingredients.module.css';
import clsx from "clsx";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientList} from "./ingredient-list/ingredient-list";
import {IngredientModel} from "../../utils/model";

interface Props {
    data: IngredientModel[];
}

export const BurgerIngredients = (props: Props) => {
    const [current, setCurrent] = React.useState('bun');

    const buns = props.data.filter(item => item.type === 'bun');
    const sauces = props.data.filter(item => item.type === 'sauce');
    const mains = props.data.filter(item => item.type === 'main');

    return (
        <section className={styles.container}>
            <h1 className={clsx('text text_type_main-large pt-10 pb-5', styles.title)}>Соберите бургер</h1>

            <div className={clsx('mb-10', styles.tabs)}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <div className={clsx(styles.ingredient_list, 'custom-scroll')}>
                <IngredientList title={'Булки'} items={buns}/>
                <IngredientList title={'Соусы'} items={sauces}/>
                <IngredientList title={'Начинки'} items={mains}/>
            </div>

        </section>
    );
};