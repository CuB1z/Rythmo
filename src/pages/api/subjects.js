import {
    retrieveSubjects,
    insertSubject,
    removeSubject,
    updateSubject,
    moveSubject
} from "@lib/db/Subject"

export const GET = async () => {
    const res = await retrieveSubjects()

    console.log("GET")
    console.log(res)
    return new Response(JSON.stringify(res))
}

export const POST = async ({ request }) => {
    const { name } = await request.json();
    const res = await insertSubject(name);

    console.log("POST")
    console.log(res)
    return new Response(JSON.stringify(res));
}

export const DELETE = async ({ request }) => {
    const { id } = await request.json();
    const res = await removeSubject(id);

    console.log("DELETE: ", id)
    console.log(res)
    return new Response(JSON.stringify(res));
}

export const PATCH = async ({ request }) => {
    const { id, name } = await request.json();

    const res = await updateSubject(id, name);
    console.log("PATCH: ", id)
    console.log(res)
    return new Response(JSON.stringify(res));
}
