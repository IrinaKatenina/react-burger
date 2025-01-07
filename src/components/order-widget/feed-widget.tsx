import React, {useMemo} from "react";
import {OrderModel} from "../../utils/model.ts";
import styles from "./feed-widget.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "../../services/store.ts";
import {getAllIngredients} from "../../services/ingredients/selectors.ts";
import {countPrice} from "../../utils/ingredient-api.ts";

type Props = {
    order: OrderModel;
    profile?: boolean;
};

export const FeedWidget = ({order, profile}: Props): React.JSX.Element => {
    const location = useLocation();
    const allIngredients = useSelector(getAllIngredients);
    const orderIngredients = useMemo(() => order.ingredients
        .map(ingredientId => allIngredients.find(item => item._id === ingredientId))
        .filter(item => !!item), [order]);

    const visibleIngredients = orderIngredients.slice(0, 6);
    const additionalCount = order.ingredients.length - 6 > 0 ? order.ingredients.length - 6 : 0
    const statusText = order.status === "done" ? "Выполнен" : (order.status === "canceled" ? "Отменен" : "Готовится");
    const totalPrice = useMemo(() => countPrice(orderIngredients), [orderIngredients]);

    const url = profile ? `/profile/orders/${order.number}`: `/feed/${order.number}`;
    return (
        <Link key={order._id}
              to={url}
              state={{background: location}}
              className={styles.link}>
            <div className={styles.container}>
                <div className={styles.row_container}>
                    <span className="text text_type_digits-default">#{order.number.toString().padStart(6, '0')}</span>
                    <span className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(order.createdAt)}/>
                    </span>
                </div>
                <p className="text text_type_main-medium">{order.name}</p>
                {profile && <p className={clsx("text text_type_main-default mb-8", styles[`status_${order.status}`])}>{statusText}</p>}
                <div className={styles.row_container}>
                    <div className={styles.ingredient_list}>
                        {visibleIngredients.map((ingredient, index) =>
                            <div key={ingredient._id}
                                 className={clsx(styles.ingredient, index === visibleIngredients.length - 1 && additionalCount > 0 && styles.ingredient_opacity,)}
                                 style={{zIndex: visibleIngredients.length - index}}
                                 title={ingredient.name}>
                                <img className={styles.ingredient_image} src={ingredient.image} alt={ingredient.name}
                                />
                            </div>
                        )}
                        {additionalCount > 0 &&
                            <span className={clsx(styles.additional_count, "text text_type_main-default")}
                                  style={{zIndex: visibleIngredients.length + 1}}>+{additionalCount}</span>}
                    </div>
                    <div className={styles.currency_container}>
                        <span className="text text_type_digits-default">{totalPrice}</span> <CurrencyIcon
                        type="primary"/>
                    </div>
                </div>
            </div>
        </Link>
    );
}