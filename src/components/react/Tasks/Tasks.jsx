import styles from "@styles/Tasks/Tasks.module.css"
import { useState } from "react"

import SingleTask from "@components/react/Tasks/SingleTask.jsx"
import Button from "@components/react/Button.jsx"
import { addTask } from "@utils/tasks.js"

// Fake data
import { fake_data } from "@utils/fake_data.js"

export default function Tasks() {
    const [data, setData] = useState(fake_data)

    const handleClick = (event) => {
        const id = event.target.id
        const response = addTask(data, id, "New Task", "AD")
        
        if (response.ok) {
            setData(response.data)
        } else {
            console.error("Failed to add a new task")
        }
    }

    return (
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
                                data[key].tasks?.map((task) =>
                                    <SingleTask key={task.id} name={task.name} tag={task.tag} />
                                )
                            }
                        </ul>
                        <div className={styles.add_task}>
                            <Button id={key} onClick={(event) => handleClick(event)}>Add Task</Button>
                        </div>
                    </section>
                ))
            }
        </div>
    )
}