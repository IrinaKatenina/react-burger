import styles from './reset-password.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRef, useState} from "react";
import clsx from "clsx";


export function ResetPasswordPage() {
    const [codeValue, setCodeValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const loginInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const onEyeIconClick = () => {
        setTimeout(() => passwordInputRef.current!.focus(), 0)
        setShowPassword(!showPassword);
    }

    return (
        <div className={styles.container}>
            <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>

            <Input
                type={'text'}
                placeholder={'Введите новый пароль'}
                onChange={e => setPasswordValue(e.target.value)}
                icon={showPassword ? 'HideIcon' : 'ShowIcon'}
                value={passwordValue}
                name={'name'}
                error={false}
                ref={passwordInputRef}
                onIconClick={onEyeIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />

            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => setCodeValue(e.target.value)}
                value={codeValue}
                name={'name'}
                error={false}
                ref={loginInputRef}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
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