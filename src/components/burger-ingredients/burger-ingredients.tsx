import React, {useCallback} from 'react';
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
    const [currentTab, setCurrentTab] = React.useState('bun');
    const currentIngredient = useSelector((store: StateModel) => store.currentIngredient);

    const allIngredients = useSelector((store: StateModel) => store.allIngredients);

    const buns = allIngredients.filter(item => item.type === 'bun');
    const sauces = allIngredients.filter(item => item.type === 'sauce');
    const mains = allIngredients.filter(item => item.type === 'main');

    const containerRef = React.createRef<HTMLDivElement>();
    const bunsRef = React.createRef<HTMLUListElement>();
    const saucesRef = React.createRef<HTMLUListElement>();
    const mainsRef = React.createRef<HTMLUListElement>();

    const onIngredientClick = (ingredient: IngredientModel) => {
        dispatch({type: SET_CURRENT_INGREDIENT, payload: ingredient});
    };

    const onCloseModal = () => {
        dispatch({type: SET_CURRENT_INGREDIENT, payload: null});
    };

    const onTabClick = ((tab: string) => {
        setCurrentTab(tab);

        switch (tab) {
            case 'bun':
                bunsRef.current?.scrollIntoView();
                break;
            case 'sauce':
                saucesRef.current?.scrollIntoView();
                break;
            case 'mains':
                mainsRef.current?.scrollIntoView();
                break;
        }
    });

    const onScroll = useCallback((e: React.UIEvent) => {
        const {scrollTop} = e.currentTarget;
        let tab = 'bun';

        if (scrollTop < (bunsRef.current?.offsetHeight ?? 0)) {
            tab = 'bun';
        }

        if (scrollTop > (bunsRef.current?.offsetHeight ?? 0) && scrollTop < (saucesRef.current?.offsetHeight ?? 0)) {
            tab = 'sauce';
        }

        if (scrollTop > (saucesRef.current?.offsetHeight ?? 0)) {
            tab = 'mains';
        }

        setCurrentTab(tab);
    }, [bunsRef, saucesRef]);

    return (
        <section className={styles.container}>
            <h1 className={clsx('text text_type_main-large pt-10 pb-5', styles.title)}>Соберите бургер</h1>

            <div className={clsx('mb-10', styles.tabs)}>
                <Tab value="bun" active={currentTab === 'bun'} onClick={onTabClick}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={onTabClick}>
                    Соусы
                </Tab>
                <Tab value="mains" active={currentTab === 'mains'} onClick={onTabClick}>
                    Начинки
                </Tab>
            </div>

            <div className={clsx(styles.ingredient_list, 'custom-scroll')} onScroll={onScroll} ref={containerRef}>
                <IngredientList title={'Булки'} items={buns} onIngredientClick={onIngredientClick} ref={bunsRef}/>
                <IngredientList title={'Соусы'} items={sauces} onIngredientClick={onIngredientClick} ref={saucesRef}/>
                <IngredientList title={'Начинки'} items={mains} onIngredientClick={onIngredientClick} ref={mainsRef}/>
            </div>

            {currentIngredient && (
                <Modal header={'Детали ингредиента'} onClose={onCloseModal}>
                    <IngredientDetails/>
                </Modal>
            )}
        </section>
    );
};