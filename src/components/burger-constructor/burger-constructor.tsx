import styles from './burger-constructor.module.css';
import clsx from "clsx";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useMemo, useState} from "react";
import {Modal} from "../modal/modal.tsx";
import {OrderDetails} from "../order-details/order-details.tsx";
import {useDispatch, useSelector} from "react-redux";
import {clearOrder, makeOrder} from "../../services/order/actions.ts";
import {getConstructorIngredients} from "../../services/burger-constructor/selectors.ts";

export const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const data = useSelector(getConstructorIngredients);

    const bunItem = data.bun;
    const items = data.ingredients?.filter((item) => item.type !== 'bun');

    const totalPrice = useMemo(() => {
        const itemsPrice = items.reduce((acc, item) => acc + (item?.price ?? 0), 0);
        return (bunItem?.price ?? 0) * 2 + itemsPrice;
    }, [bunItem, items]);

    const [isPopupVisible, setPopupVisible] = useState(false);

    const onMakeOrder = () => {
        const ingredients = [bunItem?._id, items.map(item => item?._id), bunItem?._id];
        dispatch(makeOrder({ingredients: ingredients}));

        setPopupVisible(true);
    };

    const onCloseModal = () => {
        dispatch(clearOrder());
        setPopupVisible(false);
    };

    return ((
            <section className={clsx('pt-25 pl-4 pr-4', styles.container)}>
                <ul className={styles.list}>

                    <li key={bunItem?._id} className={clsx('pl-8', styles.li)}>
                        {bunItem ?
                            <ConstructorElement
                                type={'top'}
                                text={bunItem.name + " (верх)"}
                                price={bunItem.price}
                                thumbnail={bunItem.image}
                                isLocked={true}
                            /> :
                            <ConstructorElement
                                extraClass={'_empty'}
                                type={'top'}
                                text={'Выберите булку'}
                                price={0}
                                thumbnail={''}
                                isLocked={true}
                            />}
                    </li>

                    <div className={clsx(styles.scroll, 'custom-scroll')}>
                        {items?.length ?
                            items.map(item => (
                                <li key={item._id} className={styles.li}>
                                    <DragIcon className={styles.icon_drag} type="primary"/>
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </li>
                            )) :
                            <li key={"center"} className={clsx('pl-8', styles.li)}>
                                <ConstructorElement
                                    extraClass={'_empty '}
                                    text={'Выберите начинку'}
                                    price={0}
                                    thumbnail={''}
                                />
                            </li>
                        }
                    </div>
                    <li key={bunItem?._id + "_bottom"} className={clsx('pl-8', styles.li)}>
                        {bunItem ?
                            <ConstructorElement
                                type={'bottom'}
                                text={bunItem.name + " (низ)"}
                                price={bunItem.price}
                                thumbnail={bunItem.image}
                                isLocked={true}
                            /> :
                            <ConstructorElement
                                extraClass={'_empty'}
                                type={'bottom'}
                                text={'Выберите булку'}
                                price={0}
                                thumbnail={''}
                                isLocked={true}
                            />}
                    </li>
                </ul>

                <div className={clsx('pt-10 pb-10', styles.toolbar)}>
                    <div className={clsx('text text_type_digits-medium', styles.price)}>
                        {totalPrice}
                        <CurrencyIcon type="primary"/>
                    </div>

                    <Button htmlType="button" type="primary" size="large" onClick={onMakeOrder}
                            disabled={!bunItem || !items?.length}>
                        Оформить заказ
                    </Button>
                </div>

                {isPopupVisible && (
                    <Modal onClose={onCloseModal}>
                        <OrderDetails/>
                    </Modal>
                )}
            </section>
        )
    );
}