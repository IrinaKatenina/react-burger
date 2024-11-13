import styles from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {HeaderButton} from "./button/header-button";
import clsx from "clsx";

export const AppHeader = () => (
    <header className={clsx('pt-4 pb-4', styles.header)}>
        <div className={styles.header_inner}>
            <nav className={styles.header_group}>
                <HeaderButton active={true}><BurgerIcon type="primary"/>Конструктор</HeaderButton>
                <HeaderButton><ListIcon type="primary"/>Лента заказов</HeaderButton>
            </nav>

            <Logo className={styles.logo}/>

            <HeaderButton><ProfileIcon type="primary"/>Личный кабинет</HeaderButton>
        </div>
    </header>
);