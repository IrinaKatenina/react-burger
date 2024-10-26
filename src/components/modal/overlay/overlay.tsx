import {createPortal} from "react-dom";
import styles from "./overlay.module.css";
import {useCallback, useEffect} from "react";

const modalRoot = document.body;

interface Props {
    onClose: () => void;
}

export function ModalOverlay(props: Props) {

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            props.onClose();
        }
    }, [props]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    }, [onKeyDown]);

    return createPortal(
        (<div className={styles.overlay} onClick={props.onClose}></div>),
        modalRoot
    );
}