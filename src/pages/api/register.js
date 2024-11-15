import { registerUser } from "@lib/supabase"

export const POST = async ({ request }) => {
    // Get the email and password from the request body
    const { email, password } = await request.json()

    // Register the user
    const { error } = await registerUser(email, password)

    // If there's an error, return the error
    if (error) {
        return new Response({}, {
            status: error.status || 400,
            statusText: error.message,
            ok: false,
        });
    }

    // If there's no error, return a success response
    return new Response({}, {
        status: 200,
        statusText: "Success",
        ok: true,
    })
}