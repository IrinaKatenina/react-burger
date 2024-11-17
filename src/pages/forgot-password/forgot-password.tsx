import {useCallback, useState} from "react";
import styles from "../login/login.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {api} from "../../utils/api.ts";
import {useNavigate} from "react-router-dom";

export function ForgotPasswordPage() {
    const [emailValue, setEmailValue] = useState('');
    const navigate = useNavigate();

    const onEmailChange = useCallback(e => {
        setEmailValue(e.target.value);
    }, [setEmailValue]);

    const onRecoverPassword = useCallback(() => {
        api.passwordReset({email: emailValue})
            .then((res: { success: boolean, message: string }) => {
                if (res.success) {
                    navigate('/reset-password');
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
        <div className={styles.container}>
            <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>

            <EmailInput
                onChange={onEmailChange}
                value={emailValue}
                name={'email'}
                placeholder="Укажите e-mail"
            />

            <Button extraClass={'mb-7'} htmlType="button" type="primary" size="medium" onClick={onRecoverPassword}>
                Восстановить
            </Button>

            <div className={clsx(styles.footer, 'mt-7')}>
                <p className={clsx(styles.footer_text, 'text_color_inactive')}>Вспомнили пароль?
                    <Button extraClass={'pt-1 pb-1 pl-1 pr-1 ml-3'} htmlType="button" type="secondary"
                            size="medium" onClick={onLoginClick}>Войти</Button>
                </p>
            </div>
        </div>
    );
}