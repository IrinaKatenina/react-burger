import React from 'react';
import styles from './burger-ingredients.module.css';
import clsx from "clsx";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientList} from "./ingredient-list/ingredient-list";
import {IngredientModel} from "../../utils/model";
import {Modal} from "../modal/modal.tsx";
import {IngredientDetails} from "./ingredient-details/ingredient-details.tsx";

interface Props {
    data: IngredientModel[];
}

export const BurgerIngredients = (props: Props) => {
    const [current, setCurrent] = React.useState('bun');
    const [currentIngredient, setCurrentIngredient] = React.useState<IngredientModel | null>(null);

    const buns = props.data.filter(item => item.type === 'bun');
    const sauces = props.data.filter(item => item.type === 'sauce');
    const mains = props.data.filter(item => item.type === 'main');

    const onIngredientClick = (ingredient: IngredientModel) => {
        setCurrentIngredient(ingredient);
    };

    const onCloseModal = () => {
        setCurrentIngredient(null);
    };

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
                <IngredientList title={'Булки'} items={buns} onIngredientClick={onIngredientClick}/>
                <IngredientList title={'Соусы'} items={sauces} onIngredientClick={onIngredientClick}/>
                <IngredientList title={'Начинки'} items={mains} onIngredientClick={onIngredientClick}/>
            </div>

            {currentIngredient && (
                <Modal header={'Детали ингредиента'} onClose={onCloseModal}>
                    <IngredientDetails model={currentIngredient}/>
                </Modal>
            )}
        </section>
    );
};