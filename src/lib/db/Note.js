import { supabase } from "@lib/supabase"

/**
 * Retrieve notes from Supabase
 * 
 * @returns {Promise<{data: any, error: any}>}
 */
export const retrieveNotes = async () => {
    const res = await supabase.from("Note").select("*")

    return { data: res.data, error: res.error }
}

/**
 * Insert a new note in Supabase
 * 
 * @param {int} subjectId
 * @param {string} name
 * @param {string} content
 * @returns {Promise<{data: any, error: any}>}
 */
export const insertNote = async (subjectId, name, content) => {
    const userId = await (await supabase.auth.getUser()).data.user.id

    const res = await supabase.from("Note").insert([
        {
            subject_id: subjectId,
            name: name,
            content: content,
            user_id: userId
        }
    ]);

    if (res.error) {
        return { data: null, error: res.error }
    }

    return await retrieveNotes()
}

/**
 * Remove a note from Supabase
 * 
 * @param {string} noteId
 * @returns {Promise<{data: any, error: any}>}
 */
export const removeNote = async (noteId) => {
    const res = await supabase.from("Note").delete().eq("id", noteId)

    if (res.error) {
        return { data: null, error: res.error }
    }

    return await retrieveNotes()
}

/**
 * Update a note in Supabase
 * 
 * @param {string} noteId
 * @param {string} name
 * @param {string} content
 * @returns {Promise<{data: any, error: any}>}
 */
export const updateNote = async (noteId, name, content) => {
    const res = await supabase.from("Note").update({ name: name, content: content }).eq("id", noteId)

    if (res.error) {
        return { data: null, error: res.error }
    }

    return await retrieveNotes()
}

/**
 * Move a note in Supabase
 * 
 * @param {string} noteId
 * @param {string} status
 * @returns {Promise<{data: any, error: any}>}
 */
export const moveNote = async (noteId, status) => {
    const res = await supabase.from("Note").update({ status: status }).eq("id", noteId)

    if (res.error) {
        return { data: null, error: res.error }
    }

    return await retrieveNotes()
}
