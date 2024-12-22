import styles from './all-orders.module.css';
import clsx from "clsx";
import React from "react";
import {FeedWidget} from "../../components/order-widget/feed-widget.tsx";
import {OrderModel} from "../../utils/model.ts";
import {useSelector} from "react-redux";
import {getAllIngredients} from "../../services/ingredients/selectors.ts";

export const AllFeedPage = (): React.JSX.Element => {

    const ingredients = useSelector(getAllIngredients);
    const orders: OrderModel[] = [
        {
            id: "034535",
            count: 480,
            date: '2022-10-10T17:33:32.877Z',
            title: "Death Star Starship Main бургер",
            ingredients: ingredients.slice(0, 5)
        },
        {
            id: "034539",
            count: 560,
            date: '2022-10-10T17:33:32.877Z',
            title: "Interstellar бургер",
            ingredients: ingredients.slice(0, 8)
        },
        {
            id: "034540",
            count: 560,
            date: '2022-10-10T17:33:32.877Z',
            title: "Interstellar бургер",
            ingredients: ingredients.slice(0, 8)
        },
        {
            id: "034541",
            count: 560,
            date: '2022-10-10T17:33:32.877Z',
            title: "Interstellar бургер",
            ingredients: ingredients.slice(0, 8)
        },
        {
            id: "034542",
            count: 560,
            date: '2022-10-10T17:33:32.877Z',
            title: "Interstellar бургер",
            ingredients: ingredients.slice(0, 8)
        }
    ];

    // TODO refactor
    const readyOrders: string[] = ['034533', '034532', '014533', '024532', '044533', '054532', '064533', '074532', '084533', '094532', '011533', '032532', '033533', '035532', '036533', '037532'].slice(0, 14);

    return (
        <div className={styles.container}>
            <header className="text text_type_main-large">Лента заказов</header>
            <div className={styles.content}>
                <div className={clsx(styles.orders_list, 'custom-scroll')}>
                    {orders.map((order) =>
                        <FeedWidget key={order.id} order={order}/>
                    )}
                </div>
                <div className={styles.statistic}>
                    <div className={styles.progress_container}>
                        <div className={styles.progress_column_container}>
                            <p className="text text_type_main-medium">Готовы:</p>
                            <div className={styles.order_number_container}>
                                {readyOrders.map(orderNumber =>
                                    <p key={orderNumber}
                                       className={clsx("text text_type_digits-default", styles.ready)}>
                                        {orderNumber}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={styles.progress_column_container}>
                            <p className="text text_type_main-medium">В работе:</p>
                            <div className={styles.order_number_container}>
                                <p className="text text_type_digits-default">034538</p>
                                <p className="text text_type_digits-default">034541</p>
                                <p className="text text_type_digits-default">034542</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statistic_value_container}>
                        <p className="text text_type_main-medium">Выполнены за все время:</p>
                        <p className="text text_type_digits-large">28 752</p>
                    </div>

                    <div className={styles.statistic_value_container}>
                        <p className="text text_type_main-medium">Выполнены за сегодня:</p>
                        <p className="text text_type_digits-large">138</p>
                    </div>
                </div>
            </div>
        </div>)
        ;

}