import styles from "./feed-details.module.css";
import React, {useEffect, useMemo} from "react";
import {getAllIngredients} from "../../services/ingredients/selectors.ts";
import {useParams} from "react-router-dom";
import clsx from "clsx";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "../../services/store.ts";
import {countPrice} from "../../utils/ingredient-api.ts";
import {IngredientModel, OrderModel} from "../../utils/model.ts";
import {getOrderByNumber} from "../../services/order/actions.ts";

type FeedDetailsProps = {
    inPopup?: boolean;
}

export function FeedDetails({inPopup}: FeedDetailsProps): React.JSX.Element | undefined {

    const dispatch = useDispatch();
    const {number} = useParams();
    const allIngredients = useSelector(getAllIngredients);

    const order: OrderModel | undefined = useSelector(state => {
        let order = state.feed.feed.orders.find(order => order.number === +number!);
        if (order) {
            return order;
        }

        order = state.profileFeed.feed.orders.find(order => order.number === +number!);
        if (order) {
            return order;
        }

        return state.order.currentOrder;
    });

    useEffect(() => {
        if (!order) {
            dispatch(getOrderByNumber(number ?? ""));
        }
    }, []);


    const ingredients = useMemo(() => {
        if (!order?.ingredients?.length) return [];

        const ingredients = order.ingredients
            .map(ingredientId => allIngredients.find(item => item._id === ingredientId))
            .filter(item => !!item)

        return ingredients.reduce((acc, curr) => {
            const unique = acc.find(item => item._id === curr?._id);
            if (!unique) {
                curr.count=1;
                acc.push(curr);
            } else {
                unique.count = (unique.count ?? 1) + 1;
            }
            return acc;
        }, [] as IngredientModel[]);

    }, [order?._id]);


    const totalPrice = useMemo(() => countPrice(ingredients), [ingredients]);

    if (!order) {
        return <p>Загрузка...</p>
    }

    const statusText = order.status === "done" ? "Выполнен" : (order.status === "canceled" ? "Отменен" : "Готовится");


    return (
        order && <div className={clsx(styles.container)}>
            <p className={clsx("text text_type_digits-default", styles.order_number, inPopup && styles.in_popup)}>#{number?.padStart(6, '0')}</p>
            <p className="text text_type_main-medium mt-6">{order.name}</p>
            <p className={clsx("text text_type_main-default mb-8", styles[`status_${order.status}`])}>{statusText}</p>
            <p className="text text_type_main-medium mt-8 mb-6">Состав:</p>

            <div className={clsx(styles.list, 'custom-scroll')}>
                {ingredients.map((ingredient, index) =>
                    <div key={ingredient._id} className={styles.ingredient_container}>
                        <div className={styles.ingredient_container_part}>
                            <div key={index} className={styles.img_container}>
                                <img src={ingredient.image} alt={ingredient.name} className={styles.img}></img>
                            </div>
                            <p className="text text_type_main-default">{ingredient.name}</p>
                        </div>
                        <div className={styles.ingredient_container_part}>
                            <p className={clsx("text text_type_digits-default", styles.price)}>
                                {ingredient.count ?? 1} x {ingredient.price}
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.toolbar}>
                <span
                    className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(order.createdAt)}/>
                </span>
                <div className={styles.toolbar_price}>
                    <p className={clsx("text text_type_digits-default", styles.price)}>{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    );

}