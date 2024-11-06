import styles from './burger-constructor.module.css';
import clsx from "clsx";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {StateModel} from "../../utils/model";
import {useState} from "react";
import {Modal} from "../modal/modal.tsx";
import {OrderDetails} from "../order-details/order-details.tsx";
import {useSelector} from "react-redux";

export const BurgerConstructor = () => {
    const total = 610;
    const data = useSelector((store: StateModel) => store.constructorIngredients);

    const bunItem = data?.find((item) => item.type === 'bun');
    const items = data?.filter((item) => item.type !== 'bun');

    const [isPopupVisible, setPopupVisible] = useState(false);

    const onMakeOrder = () => {
        setPopupVisible(true);
    };

    const onCloseModal = () => {
        setPopupVisible(false);
    };

    return (bunItem && items && (
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

                    <Button htmlType="button" type="primary" size="large" onClick={onMakeOrder}>
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