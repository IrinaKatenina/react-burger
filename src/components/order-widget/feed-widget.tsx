import React from "react";
import {OrderModel} from "../../utils/model.ts";
import styles from "./feed-widget.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {Link, useLocation} from "react-router-dom";

type Props = {
    order: OrderModel
};

export const FeedWidget = ({order}: Props): React.JSX.Element => {
    const location = useLocation();

    const visibleIngredients = order.ingredients.slice(0, 6);
    const additionalCount = order.ingredients.length - 6 > 0 ? order.ingredients.length - 6 : 0

    return (
        <Link key={order.id}
              to={`/feed/${order.id}`}
              state={{background: location}}
              className={styles.link}>
            <div className={styles.container}>
                <div className={styles.row_container}>
                    <span className="text text_type_digits-default">#{order.id}</span>
                    <span className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(order.date)}/>
                    </span>
                </div>
                <p className="text text_type_main-medium">{order.title}</p>
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
                        <span className="text text_type_digits-default">{order.count}</span> <CurrencyIcon
                        type="primary"/>
                    </div>
                </div>
            </div>
        </Link>
    );
}