import React from 'react';
import styles from './burger-ingredients.module.css';
import clsx from "clsx";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientList} from "./ingredient-list/ingredient-list";
import {IngredientModel, StateModel} from "../../utils/model";
import {Modal} from "../modal/modal.tsx";
import {IngredientDetails} from "./ingredient-details/ingredient-details.tsx";
import {useDispatch, useSelector} from "react-redux";
import {SET_CURRENT_INGREDIENT} from "../../services/actions.tsx";

export const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const [current, setCurrent] = React.useState('bun');
    const currentIngredient = useSelector((store: StateModel) => store.currentIngredient);

    const allIngredients = useSelector((store: StateModel) => store.allIngredients);

    const buns = allIngredients.filter(item => item.type === 'bun');
    const sauces = allIngredients.filter(item => item.type === 'sauce');
    const mains = allIngredients.filter(item => item.type === 'main');

    const onIngredientClick = (ingredient: IngredientModel) => {
        dispatch({type: SET_CURRENT_INGREDIENT, payload: ingredient});
    };

    const onCloseModal = () => {
        dispatch({type: SET_CURRENT_INGREDIENT, payload: null});
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
                    <IngredientDetails/>
                </Modal>
            )}
        </section>
    );
};