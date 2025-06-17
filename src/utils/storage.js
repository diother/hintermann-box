// @ts-check

const COMPLETED_KEY = 'completedLocations';
const ROUTE_KEY = 'selectedRoute';

/**
 * @param {string} id - Route ID to store
 * @returns {void}
 */
export function saveRouteId(id) {
    localStorage.setItem(ROUTE_KEY, id);
}

/**
 * @returns {string | null} - Saved route ID, or null if none exists
 */
export function getSavedRouteId() {
    return localStorage.getItem(ROUTE_KEY);
}

/**
 * @returns {Object.<string, boolean>} - Map of completed location IDs
 */
export function getCompletedLocations() {
    return JSON.parse(localStorage.getItem(COMPLETED_KEY) || '{}');
}

/**
 * @param {string} id - Location ID
 * @returns {boolean} - Whether the location is marked completed
 */
export function isLocationCompleted(id) {
    const data = getCompletedLocations();
    return !!data[id];
}

/**
 * @param {string} id - Location ID
 * @param {boolean} value - Whether the location should be completed
 * @returns {void}
 */
export function setLocationCompleted(id, value) {
    const data = getCompletedLocations();
    if (value) {
        data[id] = true;
    } else {
        delete data[id];
    }
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(data));
}

/**
 * @param {string[]} locationIds - Array of location IDs to clear
 * @returns {void}
 */
export function clearRouteProgress(locationIds) {
    const data = getCompletedLocations();
    locationIds.forEach(id => {
        delete data[id];
    });
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(data));
}
