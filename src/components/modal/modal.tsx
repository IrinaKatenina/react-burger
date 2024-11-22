import {createPortal} from "react-dom";
import styles from "./modal.module.css";
import React, {PropsWithChildren, useCallback, useEffect} from "react";
import clsx from "clsx";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "./overlay/overlay.tsx";

const modalRoot = document.body;

type Props = PropsWithChildren<{
    header?: string;
    onClose: () => void;
}>;

export const Modal = ({children, header, onClose}: Props): React.JSX.Element => {
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    }, [onKeyDown]);

    return createPortal(
        (<>
            <div className={clsx('pt-10 pr-10 pb-15 pl-10', styles.modal)}>
                <header className={styles.header}>
                    <p className={'text text_type_main-large'}>{header}</p>
                    <CloseIcon type="primary" className={styles.close} onClick={onClose}/>
                </header>
                <div className={styles.body}>{children}</div>

            </div>
            <ModalOverlay onClose={onClose}/>
        </>),
        modalRoot
    );
}