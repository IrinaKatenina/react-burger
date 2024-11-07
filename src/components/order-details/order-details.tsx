import styles from "./order-details.module.css";
import clsx from "clsx";
import {useSelector} from "react-redux";
import {getError, getOrderNumber, isLoading} from "../../services/order/selectors.ts";

const IMAGE_URL = 'src/images/done.png';

export function OrderDetails() {
    const loading = useSelector(isLoading);
    const error = useSelector(getError);
    const orderNumber = useSelector(getOrderNumber);

    return (
        <div className={styles.container}>
            {loading ? (
                    <p className='text text_type_main-default'>Загрузка...</p>
                ) :
                (!loading && !orderNumber && error) ? (
                        <p>Ошибка: {error}</p>
                    ) :
                    (<>
                        <p className='text text_type_digits-large mb-8'>{orderNumber}</p>
                        <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>

                        <img className={clsx('mb-15', styles.image)} src={IMAGE_URL} alt={'order done'}/>

                        <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
                        <p className='text text_type_main-default text_color_inactive mb-15'>
                            Дождитесь готовности на орбитальной станции
                        </p>
                    </>)
            }
        </div>
    );
}