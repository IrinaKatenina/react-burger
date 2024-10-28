import styles from "./overlay.module.css";

interface Props {
    onClose: () => void;
}

export function ModalOverlay(props: Props) {
    return <div className={styles.overlay} onClick={props.onClose}></div>;
}