import styles from './login.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRef, useState} from "react";
import clsx from "clsx";

export function LoginPage() {
    const [loginValue, setLoginValue] = useState('')
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
            <h1 className={'text text_type_main-medium'}>Вход</h1>

            <Input
                type={'text'}
                placeholder={'E-mail'}
                onChange={e => setLoginValue(e.target.value)}
                value={loginValue}
                name={'name'}
                error={false}
                ref={loginInputRef}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />

            <Input
                type={'text'}
                placeholder={'Пароль'}
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