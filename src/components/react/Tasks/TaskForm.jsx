import styles from "@styles/Tasks/TaskForm.module.css"

export default function TaskForm() {
    return (
        <form className={styles.form}>
            <div className={styles.form_group}>
                <label htmlFor="task_name">Task</label>
                <input type="text" id="task_name" name="task_name" placeholder="Write a task" />
            </div>
            <div className={styles.form_group}>
                <label htmlFor="task_tag">Tag</label>
                <input type="text" id="task_tag" name="task_tag" placeholder="Add a tag" />
            </div>
            <div className={styles.form_group}>
                <button type="submit">Add Task</button>
            </div>
        </form>
    )
}