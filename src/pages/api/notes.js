import {
    retrieveNotes,
    insertNote,
    removeNote,
    updateNote
} from "@lib/db/Note"

export const GET = async () => {
    const res = await retrieveNotes()

    console.log("GET")
    console.log(res)
    return new Response(JSON.stringify(res))
}

export const POST = async ({ request }) => {
    const { subject_id, name, content } = await request.json();
    const res = await insertNote(subject_id, name, content);

    console.log("POST")
    console.log(res)
    return new Response(JSON.stringify(res));
}

export const DELETE = async ({ request }) => {
    const { id } = await request.json();
    const res = await removeNote(id);

    console.log("DELETE: ", id)
    console.log(res)
    return new Response(JSON.stringify(res));
}

export const PATCH = async ({ request }) => {
    const { id, name, content, status } = await request.json();

    const res = await updateNote(id, name, content);
    console.log("PATCH: ", id)
    console.log(res)
    return new Response(JSON.stringify(res));
}
