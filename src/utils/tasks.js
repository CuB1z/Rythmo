function addTask(data, key, name, tag) {
    const newTask = {
        id: Date.now(),
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

export { addTask }