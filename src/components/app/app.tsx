import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {useEffect, useState} from "react";
import {IngredientModel} from "../../utils/model.ts";
import styles from './app.module.css';
import {BurgerConstructor} from "../burger-constructor/burger-constructor.tsx";

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [data, setData] = useState<Array<IngredientModel>>([]);

    useEffect(() => {
        fetch(URL)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then((resData: { data: Array<IngredientModel> }) => setData(resData.data ?? []))
            .catch(err => {
                console.error('Could not load data', err);
            });
    }, []);

    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
                {data?.length ? (<>
                            <BurgerIngredients data={data}/>
                            <BurgerConstructor data={data}/>
                        </>
                    )
                    : <div className={styles.loading_container}>
                        <p className='text text_type_main-default'>Загрузка...</p>
                    </div>
                }
            </main>
        </>
    );
}

export default App;
