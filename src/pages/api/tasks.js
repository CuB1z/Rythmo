import { fake_data } from "@utils/fake_data"

export const GET = async ({request}) => {
    const tasks = fake_data
    return new Response(JSON.stringify(tasks))
}