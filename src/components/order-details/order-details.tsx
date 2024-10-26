import styles from "./order-details.module.css";
import clsx from "clsx";

const IMAGE_URL = 'src/images/done.png';

export function OrderDetails() {

    const orderNumber = "034536";

    return (
        <div className={styles.container}>
            <p className='text text_type_digits-large mb-8'>{orderNumber}</p>
            <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>

            <img className={clsx('mb-15', styles.image)} src={IMAGE_URL} alt={'order done'}/>

            <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mb-15'>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
}