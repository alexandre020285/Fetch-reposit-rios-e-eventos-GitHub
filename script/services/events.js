import { userUrlBase, maxItems } from "../variable.js";

async function getEvents(userName) {
    const response = await fetch(`${userUrlBase}/${userName}/events?per_page=${maxItems}`);
    const events = await response.json();
    return events.filter(event => event.type === 'CreateEvent' || event.type === 'PushEvent').slice(0, maxItems)
}

export { getEvents }