import { SERVER_CONFIG } from "./constants"
const API_SUBJECTS = `${SERVER_CONFIG.url}${SERVER_CONFIG.api}/subjects`

/**
 * Retrieve all subjects from the server using a specific key.
 * 
 * @returns {{ ok: boolean, data: object }}
*/
async function retrieveSubjects() {
    const response = await fetch(API_SUBJECTS);
    let { data } = await response.json();

    return { ok: true, data: data }
}

/**
 * Add a new subject to the subjects array of a specific key.
 * 
 * @param {string} name 
 * @returns {{ ok: boolean, data: object }}
*/
async function addSubject(name) {
    const response = await fetch(API_SUBJECTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
    })

    const parsedResponse = await response.json()
    if (parsedResponse.error) {
        return { ok: false }
    }

    let newSubject = parsedResponse.data[parsedResponse.data.length - 1];

    return { ok: true, data: newSubject }
}

/**
 * Remove a subject from the subjects array of a specific key.
 * 
 * @param {string} subjectId
 * @returns {{ ok: boolean, data: object }}
*/
async function removeSubject(subjectId) {
    const response = await fetch(API_SUBJECTS, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: subjectId })
    })

    const parsedResponse = await response.json()

    if (parsedResponse.error) {
        return { ok: false }
    }

    return { ok: true }
}

/**
 * Edit a subject from the subjects array of a specific key.
 * 
 * @param {string} subjectId
 * @param {string} name
 * @returns {{ ok: boolean, data: object }}
*/
async function editSubject(subjectId, name) {
    const response = await fetch(API_SUBJECTS, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: subjectId, name: name })
    })

    const parsedResponse = await response.json()

    if (parsedResponse.error) {
        return { ok: false }
    }

    return { ok: true }
}

export { retrieveSubjects, addSubject, removeSubject, editSubject }
