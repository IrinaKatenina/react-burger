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
    const {bun, ingredients} = useSelector(getConstructorIngredients);

    const totalPrice = useMemo(() => {
        const itemsPrice = ingredients.reduce((acc, item) => acc + (item?.price ?? 0), 0);
        return (bun?.price ?? 0) * 2 + itemsPrice;
    }, [bun, ingredients]);

    const [isPopupVisible, setPopupVisible] = useState(false);

    const onMakeOrder = () => {
        const items = [bun?._id, ingredients.map(item => item?._id), bun?._id];
        dispatch(makeOrder({ingredients: items}));

        setPopupVisible(true);
    };

    const onCloseModal = () => {
        dispatch(clearOrder());
        setPopupVisible(false);
    };

    return ((
            <section className={clsx('pt-25 pl-4 pr-4', styles.container)}>
                <ul className={styles.list}>

                    <li key={bun?._id} className={clsx('pl-8', styles.li)}>
                        {bun ?
                            <ConstructorElement
                                type={'top'}
                                text={bun.name + " (верх)"}
                                price={bun.price}
                                thumbnail={bun.image}
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
                        {ingredients?.length ?
                            ingredients.map(item => (
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
                    <li key={bun?._id + "_bottom"} className={clsx('pl-8', styles.li)}>
                        {bun ?
                            <ConstructorElement
                                type={'bottom'}
                                text={bun.name + " (низ)"}
                                price={bun.price}
                                thumbnail={bun.image}
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
                            disabled={!bun || !ingredients?.length}>
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