import { logoutUser } from "@lib/supabase"

export const GET = async () => {
    const { error } = await logoutUser()

    if (error) {
        return new Response(JSON.stringify({
            ok: false,
            message: error.message,
            status: 400,
        }))
    }
    
    return new Response(JSON.stringify({
        ok: true,
        message: "Logged out successfully",
        status: 200,
    }))
}