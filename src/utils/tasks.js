import { v4 as uuid } from 'uuid'

/**
 * Add a new task to the tasks array of a specific key.
 * 
 * @param {object} data
 * @param {string} key 
 * @param {string} name 
 * @param {string} tag 
 * @returns {{ ok: boolean, data: object }}
*/
function addTask(data, _, key, name, tag) {
    const newTask = {
        id: uuid(),
        tag: tag ? tag : "AD",
        name: name ? name : "Provide a task name"
    }

    try {
        data[key].tasks.push(newTask)
        const updatedData = { ...data }
        return { ok: true, data: updatedData }
    } catch (error) {
        console.error(error)
        return { ok: false, data }
    }
}

/**
 * Remove a task from the tasks array of a specific key.
 * 
 * @param {object} data
 * @param {string} key
 * @param {string} taskId
 * @returns {{ ok: boolean, data: object }}
*/
function removeTask(data, key, taskId) {
    try {
        const updatedTasks = data[key].tasks.filter(task => task.id !== taskId)
        data[key].tasks = updatedTasks
        const updatedData = { ...data }
        return { ok: true, data: updatedData }
    } catch (error) {
        console.error(error)
        return { ok: false, data }
    }
}

/**
 * Edit a task from the tasks array of a specific key.
 * 
 * @param {object} data
 * @param {string} key
 * @param {string} taskId
 * @param {string} name
 * @param {string} tag
*/
function editTask(data, key, taskId, name, tag) {
    try {
        const updatedTasks = data[key].tasks.map(task => {
            if (task.id === taskId) {
                task.name = name
                task.tag = tag
            }
            return task
        })

        data[key].tasks = updatedTasks
        const updatedData = { ...data }
        return { ok: true, data: updatedData }
    } catch (error) {
        console.error(error)
        return { ok: false, data }
    }
}

export { addTask, removeTask, editTask }