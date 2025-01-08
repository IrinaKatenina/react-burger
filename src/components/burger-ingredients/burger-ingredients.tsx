import React, {useCallback} from 'react';
import styles from './burger-ingredients.module.css';
import clsx from "clsx";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientList} from "./ingredient-list/ingredient-list";
import {getIngredientsByType} from "../../services/ingredients/selectors.ts";
import {useSelector} from "../../services/store.ts";

export const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = React.useState('bun');

    const {buns, sauces, mains} = useSelector(getIngredientsByType);

    const tabsRef = React.createRef<HTMLDivElement>();
    const bunsRef = React.createRef<HTMLParagraphElement>();
    const saucesRef = React.createRef<HTMLParagraphElement>();
    const mainsRef = React.createRef<HTMLParagraphElement>();

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

    const onScroll = useCallback(() => {
        const tabBottom = (tabsRef.current?.getBoundingClientRect().top ?? 0) + (tabsRef.current?.offsetHeight ?? 0);

        const tabs = ['bun', 'sauce', 'mains'];
        const refs = [bunsRef, saucesRef, mainsRef];

        const distances = refs.map((ref) => {
            return Math.abs((ref.current?.getBoundingClientRect().top ?? 0) - tabBottom);
        });

        const closestIndex = distances.indexOf(Math.min(...distances));

        setCurrentTab(tabs[closestIndex]);
    }, [bunsRef, saucesRef, mainsRef, tabsRef]);

    return (
        <section className={styles.container}>
            <h1 className={clsx('text text_type_main-large pt-10 pb-5', styles.title)}>Соберите бургер</h1>

            <div className={clsx('mb-10', styles.tabs)} ref={tabsRef}>
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

            <div className={clsx(styles.ingredient_list, 'custom-scroll')} onScroll={onScroll}>
                <IngredientList title={'Булки'} items={buns} ref={bunsRef}/>
                <IngredientList title={'Соусы'} items={sauces} ref={saucesRef}/>
                <IngredientList title={'Начинки'} items={mains} ref={mainsRef}/>
            </div>
        </section>
    );
};