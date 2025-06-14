// @ts-check 

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
 * @returns {Promise<LocationMap>}
 */
export async function loadLocations() {
    const res = await fetch('/data/locations.json');
    if (!res.ok) throw new Error('Failed to load locations');
    return await res.json();
}

