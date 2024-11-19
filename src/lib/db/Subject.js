import { supabase } from "@lib/supabase"

/**
 * Retrieve subjects from Supabase
 * 
 * @returns {Promise<{data: any, error: any}>}
 */
export const retrieveSubjects = async () => {
    const res = await supabase.from("Subject").select("*")

    return { data: res.data, error: res.error }
}

/**
 * Insert a new subject in Supabase
 * 
 * @param {string} name
 * @returns {Promise<{data: any, error: any}>}
 */
export const insertSubject = async (name) => {
    const userId = await (await supabase.auth.getUser()).data.user.id

    const res = await supabase.from("Subject").insert([
        {
            name: name,
            user_id: userId,
        }
    ])

    if (res.error) {
        return { data: null, error: res.error }
    }

    return await retrieveSubjects()
}

/**
 * Remove a subject from Supabase
 * 
 * @param {string} subjectId
 * @returns {Promise<{data: any, error: any}>}
 */
export const removeSubject = async (subjectId) => {
    const res = await supabase.from("Subject").delete().eq("id", subjectId)

    if (res.error) {
        return { data: null, error: res.error }
    }

    return await retrieveSubjects()
}

/**
 * Update a subject in Supabase
 * 
 * @param {string} subjectId
 * @param {string} name
 * @returns {Promise<{data: any, error: any}>}
 */
export const updateSubject = async (subjectId, name) => {
    const res = await supabase.from("Subject").update({ name: name }).eq("id", subjectId)

    if (res.error) {
        return { data: null, error: res.error }
    }

    return await retrieveSubjects()
}
