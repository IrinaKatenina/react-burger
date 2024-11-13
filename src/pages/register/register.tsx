import {useState} from "react";
import styles from "../login/login.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";

export function RegisterPage() {
    const [nameValue, setNameValue] = useState('')
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
            <h1 className={'text text_type_main-medium'}>Регистрация</h1>

            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setNameValue(e.target.value)}
                value={nameValue}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />

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
                Зарегистироваться
            </Button>

            <div className={clsx(styles.footer, 'mt-7')}>
                <p className={clsx(styles.footer_text, 'text_color_inactive')}>Уже зарегистрированы?
                    <Button extraClass={'pt-1 pb-1 pl-1 pr-1 ml-3'} htmlType="button" type="secondary"
                            size="medium">Войти</Button>
                </p>
            </div>
        </div>
    );
}