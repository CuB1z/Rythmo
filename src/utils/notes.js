import { SERVER_CONFIG } from "./constants"
const API_NOTES = `${SERVER_CONFIG.url}${SERVER_CONFIG.api}/notes`

/**
 * Retrieve all subjects from the server using a specific key.
 * 
 * @returns {{ ok: boolean, data: object }}
*/
async function retrieveNotes() {
    const response = await fetch(API_NOTES);
    const { data } = await response.json();

    return { ok: true, data: data }
}

/**
 * Add a new note to the notes array of a specific key.
 * 
 * @param {string} name 
 * @param {string} content 
 * @returns {{ ok: boolean, data: object }}
*/
async function addNote(subjectId, name, content) {
    const response = await fetch(API_NOTES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject_id: subjectId, name: name, content: content })
    })

    const parsedResponse = await response.json();
    console.log(parsedResponse);

    if (parsedResponse.error) {
        return { ok: false, data: {} }
    }

    let newNote = parsedResponse.data[parsedResponse.data.length - 1];

    return { ok: true, data: newNote }
}

/**
 * Remove a note from the notes array of a specific key.
 * 
 * @param {string} noteId
 * @returns {{ ok: boolean, data: object }}
*/
async function removeNote(noteId) {
    const response = await fetch(API_NOTES, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: noteId })
    })

    const parsedResponse = await response.json()

    if (parsedResponse.error) {
        return { ok: false }
    }

    return { ok: true }
}

/**
 * Edit a note from the tasks array of a specific key.
 * 
 * @param {string} noteId
 * @param {string} name
 * @param {string} tag
 * @returns {{ ok: boolean, data: object }}
*/
async function editNote(noteId, name, content) {
    const response = await fetch(API_NOTES, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: noteId, name: name, content: content })
    })

    const parsedResponse = await response.json()

    if (parsedResponse.error) {
        return { ok: false }
    }

    return { ok: true }
}

export { retrieveNotes, addNote, removeNote, editNote }
