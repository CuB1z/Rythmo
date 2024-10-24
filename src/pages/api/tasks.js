import { retrieveTasks } from "@lib/supabase"

export const GET = async () => {
    const tasks = await retrieveTasks()
    return new Response(JSON.stringify(tasks))
}