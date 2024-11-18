import styles from './user.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import clsx from "clsx";
import {useSelector} from "react-redux";
import {getUser} from "../../../services/user/slice.ts";


export const UserProfilePage = () => {
    const user = useSelector(getUser);
    const [nameValue, setNameValue] = useState(user?.name ?? '')
    const [emailValue, setEmailValue] = useState(user?.email ?? '')
    const [passwordValue, setPasswordValue] = useState('');

    const onEmailChange = e => {
        setEmailValue(e.target.value)
    }

    const onPasswordChange = e => {
        setPasswordValue(e.target.value)
    }

    return (
        <div className={clsx('mt-10', styles.container)}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setNameValue(e.target.value)}
                value={nameValue}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                icon={'EditIcon'}
            />

            <EmailInput
                onChange={onEmailChange}
                value={emailValue}
                name={'email'}
                placeholder="Логин"
                isIcon={true}
            />

            <PasswordInput
                onChange={onPasswordChange}
                value={passwordValue}
                name={'password'}
                icon="EditIcon"
                placeholder={'Пароль'}
            />

            <div className={clsx(styles.footer)}>
                <Button htmlType="button" type="secondary" size="medium">
                    Отмена
                </Button>

                <Button htmlType="button" type="primary" size="medium">
                    Сохранить
                </Button>
            </div>
        </div>
    );
}