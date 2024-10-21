import React from 'react';
import styles from './burger-constructor.module.css';
import clsx from "clsx";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientModel} from "../../utils/model";

interface Props {
    data: IngredientModel[];
}

export const BurgerConstructor = (props: Props) => {
    const total = 610;
    const bunItem = props.data.find((item) => item._id === '60666c42cc7b410027a1a9b1')!;
    const items = props.data.filter((item) => item._id !== '60666c42cc7b410027a1a9b1');

    return (
        <section className={clsx('pt-25 pl-4 pr-4', styles.container)}>
            <ul className={styles.list}>
                <li key={bunItem._id} className={clsx('pl-8', styles.li)}>
                    <ConstructorElement
                        type={'top'}
                        text={bunItem.name + " (верх)"}
                        price={bunItem.price}
                        thumbnail={bunItem.image}
                        isLocked={true}
                    />
                </li>
                <div className={clsx(styles.scroll, 'custom-scroll')}>
                    {items.map(item => (
                            <li key={item._id} className={styles.li}>
                                <DragIcon className={styles.icon_drag} type="primary"/>
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </li>
                        )
                    )}
                </div>
                <li key={bunItem._id + "_bottom"} className={clsx('pl-8', styles.li)}>
                    <ConstructorElement
                        type={'bottom'}
                        text={bunItem.name + " (низ)"}
                        price={bunItem.price}
                        thumbnail={bunItem.image}
                        isLocked={true}
                    />
                </li>
            </ul>

            <div className={clsx('pt-10 pb-10', styles.toolbar)}>
                <div className={clsx('text text_type_digits-medium', styles.price)}>
                    {total}
                    <CurrencyIcon type="primary"/>
                </div>

                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}