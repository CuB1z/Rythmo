import styles from "@styles/Button.module.css"

export default function Button({ id, children, onClick, customClass }) {
    return (
        <button
            id={id}
            className={`${styles.button} ${styles[customClass]}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}