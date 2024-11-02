import { supabase } from "@lib/supabase"

/**
 * Retrieve tasks from Supabase
 * 
 * @returns {Promise<{data: any, error: any}>}
 */
export const retrieveTasks = async () => {
    const res = await supabase.from("Task").select("*")

    return { data: res.data, error: res.error }
}

/**
 * Insert a new task in Supabase
 * 
 * @param {string} name
 * @param {string} tag
 * @returns {Promise<{data: any, error: any}>}
 */
export const insertTask = async (name, tag) => {
    const userId = await (await supabase.auth.getUser()).data.user.id

    const res = await supabase.from("Task").insert([
        {
            name: name,
            tag: tag,
            user_id: userId,
        }
    ])

    if (res.error) {
        return { data: null, error: res.error }
    }

    return await retrieveTasks()
}

/**
 * Remove a task from Supabase
 * 
 * @param {string} taskId
 * @returns {Promise<{data: any, error: any}>}
 */
export const removeTask = async (taskId) => {
    const res = await supabase.from("Task").delete().eq("id", taskId)

    if (res.error) {
        return { data: null, error: res.error }
    }

    return await retrieveTasks()
}

/**
 * Update a task in Supabase
 * 
 * @param {string} taskId
 * @param {string} name
 * @param {string} tag
 * @returns {Promise<{data: any, error: any}>}
 */
export const updateTask = async (taskId, name, tag) => {
    const res = await supabase.from("Task").update({ name: name, tag: tag }).eq("id", taskId)

    if (res.error) {
        return { data: null, error: res.error }
    }

    return await retrieveTasks()
}

/**
 * Move a task in Supabase
 * 
 * @param {string} taskId
 * @param {string} status
 * @returns {Promise<{data: any, error: any}>}
 */
export const moveTask = async (taskId, status) => {
    const res = await supabase.from("Task").update({ status: status }).eq("id", taskId)

    if (res.error) {
        return { data: null, error: res.error }
    }

    return await retrieveTasks()
}