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
 * Loads all locations from a CSV file.
 * @returns {Promise<Object.<string, RawLocation>>}
 */
export async function loadLocations() {
    const res = await fetch('/data/locations.csv');
    if (!res.ok) throw new Error('Failed to load locations.csv');
    const text = await res.text();
    return parseCSVToLocations(text);
}

/**
 * @param {string} csvText
 * @returns {Object.<string, RawLocation>}
 */
function parseCSVToLocations(csvText) {
    /** @type {Object.<string, RawLocation>} */
    const map = {};
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(';'); // expect: id;name;address;lat;lng

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(';');
        if (values.length !== headers.length) continue;

        const [id, name, address, latStr, lngStr] = values;
        const lat = parseFloat(latStr);
        const lng = parseFloat(lngStr);

        if (!id || isNaN(lat) || isNaN(lng)) continue;

        map[id] = {
            name: name.trim(),
            address: address.trim(),
            coordinates: { lat, lng }
        };
    }

    return map;
}
