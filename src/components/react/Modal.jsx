import styles from "@styles/Modal.module.css"

export default function Modal({ title, children }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.toolbar}>
                    <button className={styles.close}>X</button>
                </div>
                <div className={styles.modal_content}>
                    <h2 className={styles.title}>{title}</h2>
                    {children}
                </div>
            </div>
        </div>
    )
}