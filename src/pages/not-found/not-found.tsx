import { Link } from 'react-router-dom';

import styles from './not-found.module.css';

export const NotFound404 = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Ой! 404</h1>
                <p>Такой страницы нет.</p>
                <br/>
                <br/>
                <p>Проверьте адрес или <br/>
                    перейдите на <Link to='/' className={styles.link}>главную</Link></p>
            </div>
        </div>
    );
};