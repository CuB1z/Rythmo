const API_TASKS = 'http://localhost:4321/api/tasks'

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
    const url = API_TASKS
    const response = await fetch(url)
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
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newTask.name,
            tag: newTask.tag
        })
    })

    const parsedResponse = await response.json()

    if (parsedResponse.error) {
        return { ok: false, data }
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

export { retrieveTasks, addTask, removeTask, editTask, moveTask }