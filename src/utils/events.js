import { SERVER_CONFIG } from "./constants"
const API_EVENTS = `${SERVER_CONFIG.url}${SERVER_CONFIG.api}/events`

export const retrieveEvents = async () => {
    const response = await fetch(API_EVENTS, {
        method: "GET",
    });
    return await response.json();
};

export const addEvent = async (name, date) => {
    const response = await fetch(API_EVENTS, {
        method: "POST",
        body: JSON.stringify({ name, date }),
    });
    return await response.json();
};

export const removeEvent = async (id) => {
    const response = await fetch(API_EVENTS, {
        method: "DELETE",
        body: JSON.stringify({ id }),
    });
    return await response.json();
};
