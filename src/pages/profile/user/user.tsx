import styles from './user.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import clsx from "clsx";
import {getUser, setUser} from "../../../services/user/slice.ts";
import {api} from "../../../utils/api.ts";
import {UserRequest, UserSaveResponse} from "../../../utils/model.ts";
import {useDispatch, useSelector} from "../../../services/store.ts";


export const UserProfilePage = () => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    const initialFormState: UserRequest = {
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
    };

    const [formState, setFormState] = useState<UserRequest>(initialFormState);
    const [isChanged, setIsChanged] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        const isFormChanged = Object.keys(initialFormState).some(
            key => formState[key as keyof UserRequest] !== initialFormState[key as keyof UserRequest]
        );
        setIsChanged(isFormChanged);
    }, [formState]);


    const onSave = useCallback(() => {
        api.patchUser(formState)
            .then((res: UserSaveResponse) => {
                if (res.success) {
                    dispatch(setUser(res.user));
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [formState]);

    const onReset = useCallback(() => {
        setFormState(initialFormState);
    }, []);

    return (
        <form className={clsx('mt-10', styles.container)}
              onSubmit={(e) => {
                  if (isChanged) {
                      onSave();
                  }
                  e.preventDefault();
              }}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleChange}
                value={formState.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                icon={'EditIcon'}
            />

            <EmailInput
                onChange={handleChange}
                value={formState.email}
                name={'email'}
                placeholder="Логин"
                isIcon={true}
            />

            <PasswordInput
                onChange={handleChange}
                value={formState.password}
                name={'password'}
                icon="EditIcon"
                placeholder={'Пароль'}
            />

            {isChanged &&
                <div className={clsx(styles.footer)}>
                    <Button htmlType="button" type="secondary" size="medium" onClick={onReset}>
                        Отмена
                    </Button>

                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            }
        </form>
    );
}