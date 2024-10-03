import styles from "@styles/Modal.module.css"

export default function Modal({ title, show, setShow, children }) {
    return (
        <div className={styles.modal_container} style={{ display: show ? "" : "none" }}>
            <div className={styles.modal}>
                <div className={styles.toolbar}>
                    <button
                        className={styles.close}
                        onClick={() => setShow(false)}
                    >
                        <span>&times;</span>
                    </button>
                </div>
                <div className={styles.modal_content}>
                    <h2 className={styles.title}>{title}</h2>
                    {children}
                </div>
            </div>
        </div>
    )
}