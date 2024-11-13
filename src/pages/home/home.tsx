import styles from "./home.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerIngredients} from "../../components/burger-ingredients/burger-ingredients.tsx";
import {BurgerConstructor} from "../../components/burger-constructor/burger-constructor.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loadAllIngredients} from "../../services/ingredients/actions.ts";
import {getError, hasAllIngredientsData, isLoading} from "../../services/ingredients/selectors.ts";

export function HomePage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllIngredients());
    }, []);

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