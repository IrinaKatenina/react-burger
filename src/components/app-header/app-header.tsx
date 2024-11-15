import styles from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {HeaderButton} from "./button/header-button";
import clsx from "clsx";
import {NavLink} from "react-router-dom";

export const AppHeader = () => (
    <header className={clsx('pt-4 pb-4', styles.header)}>
        <nav className={styles.header_inner}>
            <div className={styles.header_group}>
                <NavLink end to="/" className={styles.link}>
                    {({isActive}) => (
                        <HeaderButton active={isActive}>
                            <BurgerIcon type={isActive ? "primary" : "secondary"}/>Конструктор
                        </HeaderButton>
                    )}
                </NavLink>
                <NavLink end to="/orders" className={styles.link}>
                    {({isActive}) => (
                        <HeaderButton active={isActive}>
                            <ListIcon type={isActive ? "primary" : "secondary"}/>Лента заказов
                        </HeaderButton>
                    )}
                </NavLink>
            </div>

            <Logo className={styles.logo}/>

            <NavLink end to="/profile" className={styles.link}>
                {({isActive}) => (
                    <HeaderButton active={isActive}>
                        <ProfileIcon type={isActive ? "primary" : "secondary"}/>Личный кабинет
                    </HeaderButton>
                )}
            </NavLink>
        </nav>
    </header>
);