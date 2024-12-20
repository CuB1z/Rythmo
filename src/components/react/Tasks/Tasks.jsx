import styles from "@styles/Tasks/Tasks.module.css"
import { useEffect, useState } from "react"

import SingleTask from "@components/react/Tasks/SingleTask.jsx"
import Modal from "@components/react/Modal.jsx"
import TaskForm from "@components/react/Tasks/TaskForm.jsx"
import Button from "@components/react/Button.jsx"
import PomodoroTimer from "@components/react/Timer/PomodoroTimer.jsx"


import {
    retrieveTasks,
    addTask,
    removeTask,
    editTask,
    moveTask
} from "@utils/tasks.js"

// Fake data
export default function Tasks() {
    const [data, setData] = useState({
        to_do: { title: "To Do", tasks: [] },
        ongoing: { title: "Ongoing", tasks: [] },
        completed: { title: "Completed", tasks: [] }
    })
    const [showModal, setShowModal] = useState(false)

    // Fetch data from the API ==================================================
    useEffect(() => {
        const fetchData = async () => {
            const response = await retrieveTasks()
            setData(response.data)
        }

        fetchData()
    }, [])

    // Handle onclick event to add a new task ==================================
    const handleAddTask = () => {
        setShowModal(true)
    }

    // Add a new task to the selected list =====================================
    const onAdd = async (taskName, taskTag) => {
        const response = await addTask(taskName, taskTag)
        if (response.ok) setData(response.data)
    }

    // Handle submit event to add a new task ===================================
    const handleSubmit = (_, taskName, taskTag) => {
        onAdd(taskName, taskTag)
        setShowModal(false)
    }

    // Remove a task from the selected list ====================================
    const onDelete = async (id) => {
        const response = await removeTask(id)
        if (response.ok) setData(response.data)
    }

    // Edit a task from the selected list ======================================
    const onEdit = async (id, taskName, taskTag) => {
        const response = await editTask(id, taskName, taskTag)
        if (response.ok) setData(response.data)
    }

    // Move a task from one list to another ====================================
    const onMove = async (fromKey, id) => {
        const toKey = fromKey === "to_do" ? "ongoing" : "completed"
        const response = await moveTask(fromKey, toKey, id)

        if (response.ok) setData(response.data)
    }

    return (
        <>
            <div className={styles.pomodoro_container}>
                <PomodoroTimer/>
            </div>

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
                                            <p className={styles.empty_text}>No
                                                tasks {data[key].title.toLowerCase()}</p>
                                            {
                                                key === "to_do" &&
                                                <p className={styles.empty_text}>Click on the button below to add a new
                                                    task</p>
                                            }
                                        </li>
                                    )
                                }
                            </ul>
                            <div className={styles.add_task}>
                                {
                                    key === "to_do" &&
                                    <Button id={key} onClick={handleAddTask}>Add Task</Button>
                                }
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
                        task={{name: "", tag: ""}}
                        onSubmit={handleSubmit}
                        onCancel={() => setShowModal(false)}
                    />
                </Modal>
            }
        </>
    )
}