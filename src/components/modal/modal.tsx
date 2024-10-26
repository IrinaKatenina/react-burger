import {createPortal} from "react-dom";
import styles from "./modal.module.css";
import {ReactNode} from "react";
import clsx from "clsx";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "./overlay/overlay.tsx";

const modalRoot = document.body;

interface Props {
    children: ReactNode;
    header?: string;
    onClose: () => void;
}

export function Modal(props: Props) {
    const {children, header} = props;

    return createPortal(
        (<div className={clsx('pt-10 pr-10 pb-15 pl-10', styles.modal)}>
            <header className={styles.header}>
                <p className={'text text_type_main-large'}>{header}</p>
                <CloseIcon type="primary" className={styles.close} onClick={props.onClose}/>
            </header>
            <div className={styles.body}>{children}</div>
            <ModalOverlay onClose={props.onClose}/>
        </div>),
        modalRoot
    );
}