import styles from './login.module.css';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useCallback, useState} from "react";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import {login} from "../../services/user/actions.ts";
import {useDispatch} from "../../services/store.ts";

export function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value)
    }

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value)
    }

    const onRegisterClick = useCallback(() => {
        navigate('/register');
    }, []);

    const onForgotPasswordClick = useCallback(() => {
        navigate('/forgot-password');
    }, []);

    const signIn = useCallback(() => {
        void dispatch(login({"email": emailValue, "password": passwordValue}));
    }, [emailValue, passwordValue]);


    return (
        <div className={styles.container}>
            <h1 className={'text text_type_main-medium'}>Вход</h1>

            <form onSubmit={(e) => {signIn(); e.preventDefault();}} className={styles.form}>
                <EmailInput
                    onChange={onEmailChange}
                    value={emailValue}
                    name={'email'}
                    placeholder="E-mail"
                    autoComplete={"email"}
                />

                <PasswordInput
                    placeholder={'Пароль'}
                    onChange={onPasswordChange}
                    value={passwordValue}
                    name={'password'}
                    autoComplete={"current-password"}
                />

                <Button extraClass={'mb-7'} htmlType="submit" type="primary" size="medium" >
                    Войти
                </Button>
            </form>

            <div className={clsx(styles.footer, 'mt-7')}>
                <p className={clsx(styles.footer_text, 'text_color_inactive')}>Вы - новый пользователь?
                    <Button extraClass={'pt-1 pb-1 pl-1 pr-1 ml-3'} htmlType="button" type="secondary"
                            size="medium" onClick={onRegisterClick}>Зарегистрироваться</Button>
                </p>
                <p className={clsx(styles.footer_text, 'text_color_inactive')}>Забыли пароль?
                    <Button extraClass={'pt-1 pb-1 pl-1 pr-1 ml-3'} htmlType="button" type="secondary" size="medium"
                            onClick={onForgotPasswordClick}>
                        Восстановить пароль
                    </Button>
                </p>
            </div>
        </div>
    );
}