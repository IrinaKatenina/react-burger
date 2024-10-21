import React from 'react';
import styles from './header-button.module.css';
import clsx from 'clsx';

interface Props extends React.PropsWithChildren<Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size'>> {
    onClick?: () => void,
    active?: boolean
}

export const HeaderButton = (props: Props) => {
    const className = clsx(
        'text text_type_main-default pt-4 pr-5 pb-4 pl-5',
        styles.button,
        {
            [styles.button_active]: props.active
        },
    );

    return (
        <button className={className} type="button" onClick={props.onClick}>
            {props.children}
        </button>
    );
}