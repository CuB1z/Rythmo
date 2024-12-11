import { supabase } from "@lib/supabase";
import Subjects from "src/pages/subjects.astro";

/**
 * Retrieve events from Supabase
 *
 * @returns {Promise<{data: any, error: any}>}
 */
export const retrieveEvents = async () => {
    const res = await supabase.from("Events").select("*");
    return { data: res.data, error: res.error };
};

/**
 * Insert a new event in Supabase
 *
 * @param {string} name
 * @param {string} date
 * @param {string} subject
 * @returns {Promise<{data: any, error: any}>}
 */
export const insertEvent = async (name, date, subject) => {
    const userId = (await supabase.auth.getUser()).data.user.id; //  ID del usuario autenticado

    const res = await supabase.from("Events").insert([
        {
            name: name,
            date: date,
            subject: subject,
            user_id: userId,
        }
    ]);

    if (res.error) {
        console.error("Error al insertar evento:", res.error);
        return { data: null, error: res.error };
    }

    return await retrieveEvents();
};

/**
 * Remove an event from Supabase
 *
 * @param {string} eventId
 * @returns {Promise<{data: any, error: any}>}
 */
export const removeEvent = async (eventId) => {
    const res = await supabase.from("Events").delete().eq("id", eventId);

    if (res.error) {
        return { data: null, error: res.error };
    }

    return await retrieveEvents();
};

