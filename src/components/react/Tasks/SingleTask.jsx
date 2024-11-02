import styles from "@styles/Tasks/SingleTask.module.css"

import { useState } from "react"

import Modal from "@components/react/Modal.jsx"
import TaskForm from "./TaskForm"
import Button from "@components/react/Button.jsx"

export default function SingleTask({ data, task, parentKey, onDelete, onEdit, onMove }) {
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")

    // Handle editing a task on click
    const handleEdit = () => {
        setModalTitle("Edit Task")
        setShowModal(true)
    }

    // Handle moving a task on click
    const handleMove = () => {
        onMove(data, parentKey, task.id)
    }

    // Handle deleting a task on click
    const handleDelete = () => onDelete(task.id)

    // Handle editing a task
    const handleSubmit = (data, parentKey, id, taskName, taskTag) => {
        onEdit(data, parentKey, id, taskName, taskTag)
        setShowModal(false)
    }

    // Handle canceling the modal
    const onCancel = () => setShowModal(false)

    return (
        <>
            <li className={styles.task_item}>
                <div className={styles.task_content}>
                    <span className={styles.tag}>{task.tag ? task.tag : ""}</span>
                    <span className={styles.name}>{task.name}</span>
                </div>
                <div className={styles.task_actions}>
                    <div className={styles.inline}>
                        <Button
                            onClick={handleEdit}
                            customClass="tertiary"
                        >
                            <img src="/edit.svg" alt="Edit Icon" />
                        </Button>
                        <Button
                            onClick={handleDelete}
                            customClass="tertiary"
                        >
                            <img src="/trash.svg" alt="Delete Icon" />
                        </Button>
                    </div>
                    <div className={styles.inline}>
                        <Button
                            onClick={handleMove}
                            disabled={parentKey === "completed" ? true : false}
                            customClass={parentKey === "completed" ? "disabled" : "tertiary"}
                        >
                            <img src="/done.svg" alt="Done Icon" />
                        </Button>
                    </div>
                </div>
            </li>
            {
                showModal &&
                <Modal
                    title={modalTitle}
                    show={showModal}
                    setShow={setShowModal}
                >
                    <TaskForm
                        data={data}
                        parentKey={parentKey}
                        task={task}
                        onSubmit={handleSubmit}
                        onCancel={onCancel}
                    />
                </Modal>
            }
        </>
    )
}