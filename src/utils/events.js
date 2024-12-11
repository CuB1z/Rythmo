import { SERVER_CONFIG } from "./constants"
const API_EVENTS = `${SERVER_CONFIG.url}${SERVER_CONFIG.api}/events`

export const retrieveEvents = async () => {
    const response = await fetch(API_EVENTS, {
        method: "GET",
    });
    return await response.json();
};

export const addFilter = async (subject) => {
    const response = await fetch(API_EVENTS, {
        method: "GET",
        body: JSON.stringify({ subject }),
    });
    return await response.json();
};

export const addEvent = async (name, date, subject) => {
    const response = await fetch(API_EVENTS, {
        method: "POST",
        body: JSON.stringify({ name, date, subject }),
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
