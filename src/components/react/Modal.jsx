import styles from "@styles/Modal.module.css"

export default function Modal({ title, show, setShow, children }) {
    return (
        <div className={styles.overlay} style={{ display: show ? "" : "none" }}>
            <div className={styles.modal}>
                <div className={styles.toolbar}>
                    <h2 className={styles.title}>{title}</h2>
                    <button className={styles.close} onClick={() => setShow(false)}>
                        <span>&times;</span>
                    </button>
                </div>
                <hr />
                <div className={styles.modal_content}>
                    {children}
                </div>
            </div>
        </div>
    )
}