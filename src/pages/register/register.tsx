import {ChangeEvent, useCallback, useState} from "react";
import styles from "../login/login.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import {api} from "../../utils/api.ts";
import {RegisterResponse} from "../../utils/model.ts";

export function RegisterPage() {
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const navigate = useNavigate();

    const onEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
    }, []);

    const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    }, []);

    const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.target.value);
    }, []);

    const onLoginClick = useCallback(() => {
        navigate('/login');
    }, []);

    const onRegisterClick = useCallback(() => {
        api.register({"email": emailValue, "password": passwordValue, "name": nameValue})
            .then((res: RegisterResponse) => {
                if (res.success) {
                    navigate('/login');
                } else {
                    throw new Error(JSON.stringify(res));
                }
            })
            .catch(e => {
                console.error(e);
            })
    }, [emailValue, passwordValue, nameValue]);

    return (
        <div className={styles.container}>
            <h1 className={'text text_type_main-medium'}>Регистрация</h1>

            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onNameChange}
                value={nameValue}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                autoComplete={"name"}
            />

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

            <Button extraClass={'mb-7'} htmlType="button" type="primary" size="medium" onClick={onRegisterClick}>
                Зарегистироваться
            </Button>

            <div className={clsx(styles.footer, 'mt-7')}>
                <p className={clsx(styles.footer_text, 'text_color_inactive')}>Уже зарегистрированы?
                    <Button extraClass={'pt-1 pb-1 pl-1 pr-1 ml-3'} htmlType="button" type="secondary"
                            size="medium" onClick={onLoginClick}>Войти</Button>
                </p>
            </div>
        </div>
    );
}