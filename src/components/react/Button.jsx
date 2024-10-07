import styles from "@styles/Button.module.css"

export default function Button({ id, children, onClick, customClass, disabled }) {
    return (
        <button
            id={id}
            disabled={disabled}
            className={`${styles.button} ${styles[customClass]}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}