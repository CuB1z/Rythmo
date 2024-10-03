import styles from "@styles/Tasks/TaskForm.module.css"
import { useRef } from "react"
import Button from "@components/react/Button.jsx"

export default function TaskForm({ data, task, parentKey, onSubmit, onCancel }) {

    // Create refs for the input fields
    const taskNameRef = useRef(null)
    const taskTagRef = useRef(null)

    // Set the default values
    const taskName = task.name || ""
    const taskTag = task.tag || ""

    // Handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault()
        const taskNameValue = taskNameRef.current.value
        const taskTagValue = taskTagRef.current.value
        onSubmit(data, parentKey, task.id, taskNameValue, taskTagValue)
    }

    return (
        <form className={styles.form}>
            <div className={styles.form_group}>
                <label htmlFor="task_name">Task</label>
                <input
                    type="text"
                    id="task_name"
                    name="task_name"
                    placeholder="Write a task"
                    defaultValue={taskName}
                    ref={taskNameRef}
                />
            </div>
            <div className={styles.form_group}>
                <label htmlFor="task_tag">Tag</label>
                <input
                    type="text"
                    id="task_tag"
                    name="task_tag"
                    placeholder="Add a tag"
                    defaultValue={taskTag}
                    ref={taskTagRef}
                />
            </div>
            <div className={styles.form_group}>
                <Button onClick={(event) => handleSubmit(event)}>Save</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </div>
        </form>
    )
}