import styles from './all-orders.module.css';
import clsx from "clsx";
import React, {useEffect} from "react";
import {FeedWidget} from "../../components/order-widget/feed-widget.tsx";
import {useSelector} from "react-redux";
import {useDispatch} from "../../services/store.ts";
import {wsConnect, wsDisconnect} from "../../services/feed/actions.ts";
import {getFeed} from "../../services/feed/slice.ts";

const WEBSOCKET_SERVER_URL: string = "wss://norma.nomoreparties.space/orders/all";

export const AllFeedPage = (): React.JSX.Element => {
    const dispatch = useDispatch();

    const connect = () => dispatch(wsConnect(WEBSOCKET_SERVER_URL))
    const disconnect = () => dispatch(wsDisconnect());

    useEffect(() => {
        connect();

        return () => {
            disconnect();
        }
    }, []);


    const feedResponse = useSelector(getFeed);
    const orders = feedResponse.orders;

    const readyOrders: number[] = orders.slice(0, 14).filter(order => order.status === "done").map(order => order.number);
    const pendingOrders: number[] = orders.slice(0, 14).filter(order => order.status !== "done").map(order => order.number);

    return (
        !feedResponse.success ? <p>Загрузка...</p> :
            <div className={styles.container}>
                <header className="text text_type_main-large">Лента заказов</header>
                <div className={styles.content}>
                    <div className={clsx(styles.orders_list, 'custom-scroll')}>
                        {orders.map((order) =>
                            <FeedWidget key={order._id} order={order}/>
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
                                            {orderNumber.toString().padStart(6, '0')}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className={styles.progress_column_container}>
                                <p className="text text_type_main-medium">В работе:</p>
                                <div className={styles.order_number_container}>
                                    {pendingOrders.map(orderNumber =>
                                        <p key={orderNumber}
                                           className="text text_type_digits-default">
                                            {orderNumber.toString().padStart(6, '0')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={styles.statistic_value_container}>
                            <p className="text text_type_main-medium">Выполнены за все время:</p>
                            <p className="text text_type_digits-large">{feedResponse.total}</p>
                        </div>

                        <div className={styles.statistic_value_container}>
                            <p className="text text_type_main-medium">Выполнены за сегодня:</p>
                            <p className="text text_type_digits-large">{feedResponse.totalToday}</p>
                        </div>
                    </div>
                </div>
            </div>)
        ;

}