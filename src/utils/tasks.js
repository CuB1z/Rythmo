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
 * @returns {{ ok: boolean, data: object }}
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

/**
 * Move a task from one key to another key.
 * 
 * @param {object} data
 * @param {string} sourceKey
 * @param {string} destinationKey
 * @param {string} taskId
 * @returns {{ ok: boolean, data: object }}
 */
function moveTask(data, sourceKey, destinationKey, taskId) {

    // Prevent moving a task to the same list
    if (sourceKey === destinationKey) return { ok: false, data }

    try {
        const task = data[sourceKey].tasks.find(task => task.id === taskId)
        const updatedSourceTasks = data[sourceKey].tasks.filter(task => task.id !== taskId)
        const updatedDestinationTasks = [...data[destinationKey].tasks, task]

        data[sourceKey].tasks = updatedSourceTasks
        data[destinationKey].tasks = updatedDestinationTasks

        const updatedData = { ...data }
        return { ok: true, data: updatedData }
    } catch (error) {
        console.error(error)
        return { ok: false, data }
    }
}

export { addTask, removeTask, editTask, moveTask }