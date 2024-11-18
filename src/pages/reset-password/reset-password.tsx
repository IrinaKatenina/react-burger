import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useState} from "react";
import clsx from "clsx";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {api} from "../../utils/api.ts";

export function ResetPasswordPage() {
    const [codeValue, setCodeValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const onPasswordChange = useCallback(e => {
        setPasswordValue(e.target.value)
    }, [setPasswordValue]);

    const onCodeChange = useCallback(e => {
        setCodeValue(e.target.value)
    }, [setCodeValue]);

    const onSave = useCallback(() => {
        api.passwordResetReset({
            "password": passwordValue, "token": codeValue
        })
            .then((res: { success: boolean, message: string }) => {
                if (res.success) {
                    navigate("/login");
                } else {
                    throw new Error(res.message);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [passwordValue, codeValue]);

    if (location.state?.fromForgot !== "forgot-password") {
        return <Navigate to="/forgot-password"/>;
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
                onChange={onCodeChange}
                value={codeValue}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />

            <Button extraClass={'mb-7'} htmlType="button" type="primary" size="medium" onClick={onSave}>
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