import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {useEffect} from "react";
import {StateModel} from "../../utils/model.ts";
import styles from './app.module.css';
import {BurgerConstructor} from "../burger-constructor/burger-constructor.tsx";
import {useDispatch, useSelector} from "react-redux";
import {loadAllIngredients,} from "../../services/actions.tsx";


function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllIngredients());
    }, []);

    const hasData = useSelector((store: StateModel) => store.allIngredients?.length);
    const loading = useSelector((store: StateModel) => store.loading);
    const error = useSelector((store: StateModel) => store.error);

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
                    <>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </>)
                }
            </main>
        </>
    );
}

export default App;
