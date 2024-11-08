import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {useEffect} from "react";
import styles from './app.module.css';
import {useDispatch, useSelector} from "react-redux";
import {loadAllIngredients,} from "../../services/ingredients/actions.ts";
import {BurgerConstructor} from "../burger-constructor/burger-constructor.tsx";
import {getError, hasAllIngredientsData, isLoading} from "../../services/ingredients/selectors.ts";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllIngredients());
    }, []);

    const hasData = useSelector(hasAllIngredientsData);
    const loading = useSelector(isLoading);
    const error = useSelector(getError);

    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
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
            </main>
        </>
    );
}

export default App;
