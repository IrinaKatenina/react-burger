import clsx from "clsx";
import styles from "./orders.module.css";
import {FeedWidget} from "../../../components/order-widget/feed-widget.tsx";
import {useDispatch, useSelector} from "../../../services/store.ts";
import {useEffect} from "react";
import {getProfileFeed} from "../../../services/profileFeed/slice.ts";
import {wsProfileConnect, wsProfileDisconnect} from "../../../services/profileFeed/actions.ts";

const WEBSOCKET_SERVER_URL: string = "wss://norma.nomoreparties.space/orders";

export const OrdersPage = () => {

    const dispatch = useDispatch();

    const accessToken = localStorage.getItem('accessToken')?.slice(7);
    const connect = () => dispatch(wsProfileConnect(WEBSOCKET_SERVER_URL+`?token=${accessToken}`))
    const disconnect = () => dispatch(wsProfileDisconnect());

    useEffect(() => {
        connect();

        return () => {
            disconnect();
        }
    }, []);

    const profileFeedResponse = useSelector(getProfileFeed);
    const orders = profileFeedResponse.orders;

    return (
        !profileFeedResponse.success ? <p>Загрузка...</p> :
            <div className={styles.container}>
                <div className={clsx(styles.orders_list, 'custom-scroll')}>
                    {orders.map((order) =>
                        <FeedWidget key={order._id} order={order} profile={true}/>
                    )}
                </div>
            </div>
    )
}