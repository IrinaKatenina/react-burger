import styles from "./overlay.module.css";
import {FC} from "react";

interface Props {
    onClose: () => void;
}

export const ModalOverlay: FC<Props> = ({onClose}) => {
    return <div className={styles.overlay} onClick={onClose}></div>;
}