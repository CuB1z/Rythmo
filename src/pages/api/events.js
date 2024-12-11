import {
    retrieveEvents,
    insertEvent,
    removeEvent
} from "@lib/db/events";

export const GET = async () => {
    const res = await retrieveEvents();
    return new Response(JSON.stringify(res));
};

export const POST = async ({ request }) => {
    const { name, date, subject } = await request.json();
    const res = await insertEvent(name, date, subject);
    return new Response(JSON.stringify(res));
};

export const DELETE = async ({ request }) => {
    const { id } = await request.json();
    const res = await removeEvent(id);
    return new Response(JSON.stringify(res));
};


