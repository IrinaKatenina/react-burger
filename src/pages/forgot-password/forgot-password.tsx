import {useState} from "react";
import styles from "../login/login.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";

export function ForgotPasswordPage() {
    const [emailValue, setEmailValue] = useState('')

    const onEmailChange = e => {
        setEmailValue(e.target.value);
    }

    return (
        <div className={styles.container}>
            <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>

            <EmailInput
                onChange={onEmailChange}
                value={emailValue}
                name={'email'}
                placeholder="Укажите e-mail"
            />

            <Button extraClass={'mb-7'} htmlType="button" type="primary" size="medium">
                Восстановить
            </Button>

            <div className={clsx(styles.footer, 'mt-7')}>
                <p className={clsx(styles.footer_text, 'text_color_inactive')}>Вспомнили пароль?
                    <Button extraClass={'pt-1 pb-1 pl-1 pr-1 ml-3'} htmlType="button" type="secondary"
                            size="medium">Войти</Button>
                </p>
            </div>
        </div>
    );
}