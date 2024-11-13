import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import clsx from "clsx";

export function ResetPasswordPage() {
    const [codeValue, setCodeValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const onPasswordChange = e => {
        setPasswordValue(e.target.value)
    }

    return (
        <div className={styles.container}>
            <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>

            <PasswordInput
                placeholder={'Введите новый пароль'}
                onChange={onPasswordChange}
                value={passwordValue}
                name={'password'}
            />

            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => setCodeValue(e.target.value)}
                value={codeValue}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />

            <Button extraClass={'mb-7'} htmlType="button" type="primary" size="medium">
                Сохранить
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