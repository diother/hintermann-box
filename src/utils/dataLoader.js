// @ts-check 

/**
 * @typedef {Object} Route - Array of location IDs
 * @property {string} id
 * @property {string} name
 * @property {string[]} locationIds
 */

/**
 * Loads all routes from a JSON file.
 * @returns {Promise<Route[]>}
 */
export async function loadRoutes() {
    const res = await fetch('/data/routes.json');
    if (!res.ok) throw new Error('Failed to load routes');
    return await res.json();
}

/**
 * Loads all locations from a JSON file.
 * @returns {Promise<Object.<string, RawLocation>>} - Map of location Id to RawLocation
 */
export async function loadLocations() {
    const res = await fetch('/data/locations.json');
    if (!res.ok) throw new Error('Failed to load locations');
    return await res.json();
}

