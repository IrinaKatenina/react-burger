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
            .then(res => res.json())
            .then((resData: { data: Array<IngredientModel> }) => setData(resData.data ?? []))
            .catch(err => {
                console.log('Could not load data', err);
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
