export const retrieveEvents = async () => {
    const response = await fetch("/api/events", {
        method: "GET",
    });
    return await response.json();
};

export const addEvent = async (name, date) => {
    const response = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify({ name, date }),
    });
    return await response.json();
};

export const removeEvent = async (id) => {
    const response = await fetch("/api/events", {
        method: "DELETE",
        body: JSON.stringify({ id }),
    });
    return await response.json();
};
