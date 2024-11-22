import styles from "./overlay.module.css";
import React from "react";

interface Props {
    onClose: () => void;
}

export const ModalOverlay = ({onClose}: Props): React.JSX.Element => {
    return <div className={styles.overlay} onClick={onClose}></div>;
}