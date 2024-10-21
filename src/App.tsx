import React from 'react';
import {AppHeader} from "./components/app-header/app-header";
import {BurgerIngredients} from "./components/burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "./components/burger-constructor/burger-constructor";
import styles from './App.module.css';
import {data} from "./utils/data";

function App() {

    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients data={data}/>
                <BurgerConstructor data={data}/>
            </main>
        </>
    );
}

export default App;
