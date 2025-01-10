import {NavLink, NavLinkRenderProps, Outlet, useLocation} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile.module.css";
import clsx from "clsx";
import {logout} from "../../services/user/actions.ts";
import {useDispatch} from "../../services/store.ts";

const USER_TEXT = "В этом разделе вы можете изменить свои персональные данные";
const ORDERS_TEXT = "В этом разделе вы можете просмотреть свою историю заказов";

export function ProfilePage() {
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const isOrdersPage = pathname?.endsWith("orders");

    const navLinkClassName = ({isActive}: NavLinkRenderProps) => clsx(
        "text text_type_main-medium",
        styles.nav_link,
        isActive ? styles.nav_link_active : "text_color_inactive",
    );

    const onLogout = () => {
        void dispatch(logout());
    };

    return (
        <div className={styles.container}>
            <div className={styles.nav_wrapper}>
                <nav className={clsx('mt-15', styles.nav)}>
                    <NavLink className={navLinkClassName} end to="/profile">Профиль</NavLink>
                    <NavLink className={navLinkClassName} end to="/profile/orders">История заказов</NavLink>
                    <Button extraClass={styles.nav_button} htmlType="button" type="secondary" size="medium"
                            onClick={onLogout}>
                        Выход
                    </Button>
                </nav>

                <p className="text text_type_main-default text_color_inactive">{isOrdersPage ? ORDERS_TEXT : USER_TEXT}</p>
            </div>
            <section className={styles.content}>
                <Outlet/>
            </section>
        </div>
    );
}