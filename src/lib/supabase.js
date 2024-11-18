import { createClient } from "@supabase/supabase-js";
import { SERVER_CONFIG } from "@utils/constants";

export const supabase = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_KEY,
);

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

/**
 * Login a user with Google in Supabase
 * 
 * @returns {Promise<{data: any, error: any}>}
 */
export const loginUserWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${SERVER_CONFIG.url}${SERVER_CONFIG.authRoute}?provider=google`,
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