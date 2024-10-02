import styles from "../styles/Button.module.css"

export default function Button({ id, children, onClick }) {
    return (
        <button
            id={id}
            className={styles.button}
            onClick={onClick}
        >
            {children}
        </button>
    )
}