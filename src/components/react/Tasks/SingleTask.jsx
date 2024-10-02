import styles from "../../styles/Tasks/SingleTask.module.css"

export default function SingleTask({ name, tag }) {
    return (
        <li className={styles.task_item}>
            <span className={styles.span}>{tag ? tag : ""}</span>
            <span className={styles.span}>{name}</span>
        </li>
    )
}