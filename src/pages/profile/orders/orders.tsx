import clsx from "clsx";
import styles from "./orders.module.css";
import {FeedWidget} from "../../../components/order-widget/feed-widget.tsx";
import {useSelector} from "react-redux";
import {getAllIngredients} from "../../../services/ingredients/selectors.ts";
import {OrderModel} from "../../../utils/model.ts";

export const OrdersPage = () => {

    const ingredients = useSelector(getAllIngredients);
    const orders: OrderModel[] = [
        {
            id: "034535",
            count: 480,
            date: "Сегодня 16:20",
            title: "Death Star Starship Main бургер",
            ingredients: ingredients.slice(0, 5)
        },
        {
            id: "034535",
            count: 560,
            date: '2022-10-10T17:33:32.877Z',
            title: "Interstellar бургер",
            ingredients: ingredients.slice(0, 8)
        },
        {
            id: "034536",
            count: 560,
            date: '2022-10-10T17:33:32.877Z',
            title: "Interstellar бургер",
            ingredients: ingredients.slice(0, 8)
        },
        {
            id: "034537",
            count: 560,
            date: '2022-10-10T17:33:32.877Z',
            title: "Interstellar бургер",
            ingredients: ingredients.slice(0, 8)
        },
        {
            id: "034538",
            count: 560,
            date: '2022-10-10T17:33:32.877Z',
            title: "Interstellar бургер",
            ingredients: ingredients.slice(0, 8)
        }
    ];

    return (
        <div className={styles.container}>
            <div className={clsx(styles.orders_list, 'custom-scroll')}>
                {orders.map((order) =>
                    <FeedWidget key={order.id} order={order}/>
                )}
            </div>
        </div>
    )
}