// @ts-check

/**
 * @type {L.Map | null}
 */
let map = null;

/**
 * Initializes the Leaflet map.
 * @param {() => void} onInit - Callback invoked after map and tile layer are ready
 * @returns {void}
 */
export function initMap(onInit) {
    map = L.map("map");

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    onInit();
}

/**
 * @template T
 * @returns {T}
 * @throws {Error} If the map isn’t initialized
 */
function getMap() {
    if (!map) throw new Error('Map has not been initialized');
    return map;
}

/**
 * Adds a marker for the given coordinates and click callback.
 * @param {Coordinates} coords
 * @returns {L.Marker} The created Leaflet marker
 */
export function addLocationMarker(coords) {
    return L.marker([coords.lat, coords.lng]).addTo(getMap())
}

/**
 * Centers the map view on the given coordinates.
 * @param {Coordinates} coords
 * @param {number} [zoom=16] - Optional zoom level
 * @returns {void}
 */
export function centerMap(coords, zoom = 16) {
    getMap().setView([coords.lat, coords.lng], zoom);
}

