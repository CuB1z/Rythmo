import { supabase } from "@lib/supabase";

export const POST = async ({ request }) => {
    const { accessToken, refreshToken } = await request.json();

    console.log(accessToken);
    supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
    })

    // Example response
    return new Response(JSON.stringify({
        ok: true,
        message: "Subscriber activated successfully",
        status: 200,
    }));
}