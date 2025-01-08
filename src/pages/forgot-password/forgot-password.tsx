import React, {ChangeEvent, useCallback, useState} from "react";
import styles from "../login/login.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {api} from "../../utils/api.ts";
import {useNavigate} from "react-router-dom";
import {PasswordResetResponse} from "../../utils/model.ts";

export function ForgotPasswordPage(): React.JSX.Element {
    const [emailValue, setEmailValue] = useState('');
    const navigate = useNavigate();

    const onEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
    }, [setEmailValue]);

    const onRecoverPassword = useCallback(() => {
        api.passwordReset({email: emailValue})
            .then((res: PasswordResetResponse) => {
                if (res.success) {
                    navigate('/reset-password', {state: {fromForgot: 'forgot-password'}});
                } else {
                    throw new Error(res.message);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [emailValue]);

    const onLoginClick = useCallback(() => {
        navigate('/login');
    }, []);

    return (
        <form className={styles.container}
              onSubmit={(e) => {
                  onRecoverPassword();
                  e.preventDefault();
              }}>
            <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>

            <EmailInput
                onChange={onEmailChange}
                value={emailValue}
                name={'email'}
                placeholder="Укажите e-mail"
                autoComplete={"email"}
            />

            <Button extraClass={'mb-7'} htmlType="submit" type="primary" size="medium">
                Восстановить
            </Button>

            <div className={clsx(styles.footer, 'mt-7')}>
                <p className={clsx(styles.footer_text, 'text_color_inactive')}>Вспомнили пароль?
                    <Button extraClass={'pt-1 pb-1 pl-1 pr-1 ml-3'} htmlType="button" type="secondary"
                            size="medium" onClick={onLoginClick}>Войти</Button>
                </p>
            </div>
        </form>
)
    ;
}