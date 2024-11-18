import { loginUser, loginUserWithGoogle } from "@lib/supabase"

export const POST = async ({ request }) => {
    // Get the email and password from the request body
    const { email, password } = await request.json()

    // Register the user
    const { error } = await loginUser(email, password)

    // If there's an error, return the error
    if (error) {
        return new Response(JSON.stringify({
            ok: false,
            message: error.message,
            status: 400,
        }))
    }

    // If there's no error, return a success response
    return new Response(JSON.stringify({
        ok: true,
        message: "User logged in",
        status: 200,
    }))
}

export const GET = async ({ request }) => {
    // Login the user with Google
    const { data, error } = await loginUserWithGoogle()

    // If there's an error, return the error
    if (error) {
        return new Response(JSON.stringify({
            ok: false,
            message: error.message,
            status: 400,
        }))
    }

    // If there's no error, return a success response
    return new Response(JSON.stringify({
        ok: true,
        url: data.url,
        message: "Login with Google",
        status: 200,
    }))
}