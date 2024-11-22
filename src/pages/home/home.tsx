import styles from "./home.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerIngredients} from "../../components/burger-ingredients/burger-ingredients.tsx";
import {BurgerConstructor} from "../../components/burger-constructor/burger-constructor.tsx";
import {useSelector} from "react-redux";
import {getError, hasAllIngredientsData, isLoading} from "../../services/ingredients/selectors.ts";
import React from "react";

export function HomePage(): React.JSX.Element {

    const hasData = useSelector(hasAllIngredientsData);
    const loading = useSelector(isLoading);
    const error = useSelector(getError);


    return (
        <>
            {loading && !hasData ? (
                <div className={styles.loading_container}>
                    <p className='text text_type_main-default'>Загрузка...</p>
                </div>
            ) : (!loading && !hasData && error) ? (
                <p>Ошибка: {error}</p>
            ) : (
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            )
            }
        </>
    );
}