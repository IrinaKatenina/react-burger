import React from 'react';
import styles from './header-button.module.css';
import clsx from 'clsx';

interface Props extends React.PropsWithChildren<Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size'>> {
    onClick?: () => void,
    active?: boolean
}

export const HeaderButton = ({active, onClick, children}: Props): React.JSX.Element => {
    const className = clsx(
        'text text_type_main-default pt-4 pr-5 pb-4 pl-5',
        styles.button,
        {
            [styles.button_active]: active
        },
    );

    return (
        <button className={className} type="button" onClick={onClick}>
            {children}
        </button>
    );
}