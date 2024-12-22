import styles from "./feed-details.module.css";
import React from "react";
import {OrderModel} from "../../utils/model.ts";
import {useSelector} from "react-redux";
import {getAllIngredients} from "../../services/ingredients/selectors.ts";
import {useParams} from "react-router-dom";
import clsx from "clsx";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

export function FeedDetails(): React.JSX.Element | undefined {

    const {id} = useParams();
    const ingredients = useSelector(getAllIngredients);
    const model: OrderModel = //useSelector(getOrderById(id));
        {
            id: "034535",
            count: 480,
            date: '2022-10-10T17:33:32.877Z',
            title: "Death Star Starship Main бургер",
            ingredients: ingredients.slice(0, 5)
        };

    const statusText = "Выполнен";

    return (
        model && <div className={styles.container}>
            <p className={clsx("text text_type_digits-default", styles.order_number)}>#{id}</p>
            <p className="text text_type_main-medium mt-6">{model.title}</p>
            <p className={clsx("text text_type_main-default mb-8", styles.status_ready)}>{statusText}</p>
            <p className="text text_type_main-medium mt-8 mb-6">Состав:</p>

            <div className={clsx(styles.list, 'custom-scroll')}>
                {model.ingredients.map((ingredient, index) =>
                    <div key={ingredient._id} className={styles.ingredient_container}>
                        <div className={styles.ingredient_container_part}>
                            <div key={index} className={styles.img_container}>
                                <img src={ingredient.image} alt={ingredient.name} className={styles.img}></img>
                            </div>
                            <p className="text text_type_main-default">{ingredient.name}</p>
                        </div>
                        <div className={styles.ingredient_container_part}>
                            <p className={clsx("text text_type_digits-default", styles.price)}>1
                                x {ingredient.price}</p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.toolbar}>
                <span
                    className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(model.date)}/>
                </span>
                <div className={styles.toolbar_price}>
                    <p className={clsx("text text_type_digits-default", styles.price)}>{model.count}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    );

}