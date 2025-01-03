import {
    retrieveTasks,
    insertTask,
    removeTask,
    updateTask,
    moveTask
} from "@lib/db/Task"

export const GET = async () => {
    const res = await retrieveTasks()

    console.log("GET")
    console.log(res)
    return new Response(JSON.stringify(res))
}

export const POST = async ({ request }) => {
    const {name, tag} = await request.json();
    const res = await insertTask(name, tag);

    console.log("POST")
    console.log(res)
    return new Response(JSON.stringify(res));
}

export const DELETE = async ({ request }) => {
    const { id } = await request.json();
    const res = await removeTask(id);

    console.log("DELETE: ", id)
    console.log(res)
    return new Response(JSON.stringify(res));
}

export const PATCH = async ({ request }) => {
    const { id, name, tag, status } = await request.json();

    if (status) {
        // Move task
        const res = await moveTask(id, status);
        console.log("PATCH: ", id, status)
        console.log(res)
        return new Response(JSON.stringify(res));
    } else {
        // Update task
        const res = await updateTask(id, name, tag);
        console.log("PATCH: ", id)
        console.log(res)
        return new Response(JSON.stringify(res));
    }    
}