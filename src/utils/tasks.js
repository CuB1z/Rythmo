import { SERVER_CONFIG } from "./constants"
const API_TASKS = `${SERVER_CONFIG.url}${SERVER_CONFIG.api}/tasks`

/**
 * Parse the response from the server and return the data in the correct format.
 * 
 * @param {object} response
 * @returns {object}
 */
function parseTasks(response, data) {
    response.data.forEach(task => {
        const taskData = { id: task.id, tag: task.tag, name: task.name }
        const key = task.status.toLowerCase()

        data[key].tasks.push(taskData)
    })

    return data
}

/**
 * Retrieve all tasks from the server using a specific key.
 * 
 * @returns {{ ok: boolean, data: object }}
*/
async function retrieveTasks() {
    const response = await fetch(API_TASKS)
    const parsedResponse = await response.json()

    let data = {
        to_do: { title: "To Do", tasks: [] },
        ongoing: { title: "Ongoing", tasks: [] },
        completed: { title: "Completed", tasks: [] }
    }

    if (parsedResponse.error) {
        return { ok: false, data }
    }

    data = parseTasks(parsedResponse, data)
    return { ok: true, data: data }
}

/**
 * Add a new task to the tasks array of a specific key.
 * 
 * @param {string} name 
 * @param {string} tag 
 * @returns {{ ok: boolean, data: object }}
*/
async function addTask(name, tag) {
    const newTask = {
        tag: tag ? tag : "AD",
        name: name ? name : "Provide a task name"
    }

    const response = await fetch(API_TASKS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTask.name, tag: newTask.tag })
    })

    const parsedResponse = await response.json()

    if (parsedResponse.error) {
        return { ok: false, data: {} }
    }

    let data = {
        to_do: { title: "To Do", tasks: [] },
        ongoing: { title: "Ongoing", tasks: [] },
        completed: { title: "Completed", tasks: [] }
    }

    data = parseTasks(parsedResponse, data)
    return { ok: true, data: data }
}

/**
 * Remove a task from the tasks array of a specific key.
 * 
 * @param {string} taskId
 * @returns {{ ok: boolean, data: object }}
*/
async function removeTask(taskId) {
    const response = await fetch(API_TASKS, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId })
    })

    const parsedResponse = await response.json()

    if (parsedResponse.error) {
        return { ok: false, data: {} }
    }

    let data = {
        to_do: { title: "To Do", tasks: [] },
        ongoing: { title: "Ongoing", tasks: [] },
        completed: { title: "Completed", tasks: [] }
    }

    data = parseTasks(parsedResponse, data)
    return { ok: true, data: data }
}

/**
 * Edit a task from the tasks array of a specific key.
 * 
 * @param {string} taskId
 * @param {string} name
 * @param {string} tag
 * @returns {{ ok: boolean, data: object }}
*/
async function editTask(taskId, name, tag) {
    const response = await fetch(API_TASKS, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId, name, tag })
    })

    const parsedResponse = await response.json()

    if (parsedResponse.error) {
        return { ok: false, data: {} }
    }

    let data = {
        to_do: { title: "To Do", tasks: [] },
        ongoing: { title: "Ongoing", tasks: [] },
        completed: { title: "Completed", tasks: [] }
    }

    data = parseTasks(parsedResponse, data)
    return { ok: true, data: data }
}

/**
 * Move a task from one key to another key.
 * 
 * @param {string} sourceKey
 * @param {string} destinationKey
 * @param {string} taskId
 * @returns {{ ok: boolean, data: object }}
 */
async function moveTask(sourceKey, destinationKey, taskId) {
    // Prevent moving a task to the same list
    if (sourceKey === destinationKey) return { ok: false, data }

    const response = await fetch(API_TASKS, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId, status: destinationKey.toUpperCase() })
    })

    const parsedResponse = await response.json()

    if (parsedResponse.error) {
        return { ok: false, data: {} }
    }

    let data = {
        to_do: { title: "To Do", tasks: [] },
        ongoing: { title: "Ongoing", tasks: [] },
        completed: { title: "Completed", tasks: [] }
    }

    data = parseTasks(parsedResponse, data)
    return { ok: true, data: data }
}

export { retrieveTasks, addTask, removeTask, editTask, moveTask }