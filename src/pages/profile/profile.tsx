import {NavLink, Outlet, useLocation} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile.module.css";
import clsx from "clsx";

export function ProfilePage() {


    const {pathname} = useLocation();
    const isOrdersPage = pathname?.endsWith("orders");
    const userText = "В этом разделе вы можете изменить свои персональные данные";
    const ordersText = "В этом разделе вы можете просмотреть свою историю заказов";


    const navLinkClassName = ({isActive}) => clsx(
            "text text_type_main-medium",
            styles.nav_link,
            isActive ? styles.nav_link_active : "text_color_inactive",
        );

    return (
        <div className={styles.container}>
            <div className={styles.nav_wrapper}>
                <nav className={clsx('mt-15', styles.nav)}>
                    <NavLink className={navLinkClassName} end to="/profile">Профиль</NavLink>
                    <NavLink className={navLinkClassName} end to="/profile/orders">История заказов</NavLink>
                    <Button extraClass={styles.nav_button} htmlType="button" type="secondary" size="medium">
                        Выход
                    </Button>
                </nav>

                <p className="text text_type_main-default text_color_inactive">{isOrdersPage ? ordersText : userText}</p>
            </div>
            <section className={styles.content}>
                <Outlet/>
            </section>
        </div>
    );
}