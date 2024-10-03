import styles from "@styles/Tasks/Tasks.module.css"
import { useState } from "react"
import SingleTask from "@components/react/Tasks/SingleTask.jsx"
import Modal from "@components/react/Modal.jsx"
import TaskForm from "@components/react/Tasks/TaskForm.jsx"
import Button from "@components/react/Button.jsx"
import { addTask, removeTask, editTask, moveTask } from "@utils/tasks.js"

// Fake data
import { fake_data } from "@utils/fake_data.js"

export default function Tasks() {
    const [data, setData] = useState(fake_data)
    const [parentKey, setParentKey] = useState("")
    const [showModal, setShowModal] = useState(false)

    // Handle onclick event to add a new task ==================================
    const handleAddTask = (event) => {
        const id = event.target.id
        setParentKey(id)
        setShowModal(true)
    }

    // Add a new task to the selected list =====================================
    const onAdd = (data, parentKey, _, taskName, taskTag) => {
        const response = addTask(data, _, parentKey, taskName, taskTag)

        if (response.ok) {
            setData(response.data)
        } else {
            console.error("Failed to add a new task")
        }
    }

    // Handle submit event to add a new task ===================================
    const handleSubmit = (data, parentKey, _, taskName, taskTag) => {
        onAdd(data, parentKey, _, taskName, taskTag)
        setShowModal(false)
    }

    // Remove a task from the selected list ====================================
    const onDelete = (data, parentKey, id) => {
        const response = removeTask(data, parentKey, id)

        if (response.ok) {
            setData(response.data)
        } else {
            console.error("Failed to delete a task")
        }
    }

    // Edit a task from the selected list ======================================
    const onEdit = (data, parentKey, id, taskName, taskTag) => {
        const response = editTask(data, parentKey, id, taskName, taskTag)

        if (response.ok) {
            setData(response.data)
        } else {
            console.error("Failed to edit a task")
        }
    }

    // Move a task from one list to another ====================================
    const onMove = (data, fromKey, id) => {
        const toKey = fromKey === "to_do" ? "ongoing" : "completed"
        const response = moveTask(data, fromKey, toKey, id)

        if (response.ok) {
            setData(response.data)
        } else {
            console.error("Failed to move a task")
        }
    }        

    return (
        <>
            <div className={styles.task_container}>
                {
                    Object.keys(data).map((key) => (
                        <section key={key} className={styles.task_list}>
                            <h2 className={styles.h2}>
                                <span className={styles.title}>{data[key].title}</span>
                                <span className={styles.count}>({data[key].tasks.length})</span>
                            </h2>
                            <ul className={styles.task_items}>
                                {
                                    data[key].tasks.length > 0 ? (
                                    data[key].tasks?.map((task) =>
                                        <SingleTask
                                            key={task.id}
                                            task={task}
                                            parentKey={key}
                                            data={data}
                                            onDelete={onDelete}
                                            onEdit={onEdit}
                                            onMove={onMove}
                                        />
                                    )
                                    ) : (
                                        <li className={styles.empty}>
                                            <p className={styles.empty_text}>No tasks available</p>
                                                <p className={styles.empty_text}>Click on the button below to add a new task</p>
                                        </li>
                                    )
                                }
                            </ul>
                            <div className={styles.add_task}>
                                <Button id={key} onClick={(event) => handleAddTask(event)}>Add Task</Button>
                            </div>
                        </section>
                    ))
                }
            </div>
            {
                showModal &&
                <Modal
                    title="Add Task"
                    show={showModal}
                    setShow={setShowModal}
                >
                    <TaskForm
                        data={data}
                        parentKey={parentKey}
                        task={{ name: "", tag: "" }}
                        onSubmit={handleSubmit}
                        onCancel={() => setShowModal(false)}
                    />
                </Modal>
            }
        </>
    )
}