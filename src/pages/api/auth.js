
export const GET = async ({ request }) => {
    console.log('GET loginUserWithGoogle')
    console.log(request.url)

    return new Response(JSON.stringify({
        ok: true,
        message: "Login with Google",
        status: 200,
    }))
}