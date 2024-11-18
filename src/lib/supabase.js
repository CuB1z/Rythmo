import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_KEY,
);

supabase.auth.onAuthStateChange((event, session) => {
    console.log('onAuthStateChange')
    console.log(event)
    console.log(session)
})

/**
 * Register a new user with email and password in Supabase
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{data: any, error: any}>}
 */
export const registerUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })
    
    return { data, error }
}

/**
 * Login a user with email and password in Supabase
 * 
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{data: any, error: any}>}
*/
export const loginUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    return { data, error }
}

export const loginUserWithGoogle = async () => {
    console.log('loginUserWithGoogle')
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: "http://localhost:4321/api/auth",
        }
    })
      
    return { data, error }
}

/**
 * Logout a user in Supabase
 * 
 * @returns {Promise<{data: any, error: any}>}
 */
export const logoutUser = async () => {
    const { data, error } = await supabase.auth.signOut()

    return { data, error }
}

/**
 * Get the current logged in user
 * 
 * @returns {Promise<{data: any, error: any}>}
 */
export const getCurrentUser = async () => {
    const {data, error} = await supabase.auth.getUser()

    return {data, error}
}