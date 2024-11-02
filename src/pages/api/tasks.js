import { retrieveTasks, insertTask, removeTask } from "@lib/db/Task"

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