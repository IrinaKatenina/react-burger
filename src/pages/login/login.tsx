import styles from './login.module.css';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import clsx from "clsx";

export function LoginPage() {
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const onEmailChange = e => {
        setEmailValue(e.target.value)
    }

    const onPasswordChange = e => {
        setPasswordValue(e.target.value)
    }

    return (
        <div className={styles.container}>
            <h1 className={'text text_type_main-medium'}>Вход</h1>

            <EmailInput
                onChange={onEmailChange}
                value={emailValue}
                name={'email'}
                placeholder="E-mail"
            />

            <PasswordInput
                placeholder={'Пароль'}
                onChange={onPasswordChange}
                value={passwordValue}
                name={'password'}
            />

            <Button extraClass={'mb-7'} htmlType="button" type="primary" size="medium">
                Войти
            </Button>

            <div className={clsx(styles.footer, 'mt-7')}>
                <p className={clsx(styles.footer_text, 'text_color_inactive')}>Вы - новый пользователь?
                    <Button extraClass={'pt-1 pb-1 pl-1 pr-1 ml-3'} htmlType="button" type="secondary"
                            size="medium">Зарегистрироваться</Button>
                </p>
                <p className={clsx(styles.footer_text, 'text_color_inactive')}>Забыли пароль?
                    <Button extraClass={'pt-1 pb-1 pl-1 pr-1 ml-3'} htmlType="button" type="secondary" size="medium">
                        Восстановить пароль
                    </Button>
                </p>
            </div>
        </div>
    );
}