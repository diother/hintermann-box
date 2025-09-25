let map = null;

export function drawRouteLine(entities) {
    const latlngs = entities.map(loc => [loc.data.coordinates.lat, loc.data.coordinates.lng]);
    const polyline = L.polyline(latlngs, {
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        dashArray: '5, 10'
    }).addTo(map);

    // optional: zoom map to fit route
    map.fitBounds(polyline.getBounds());
}

export function initMap() {
    map = L.map('map', {
        zoomControl: false,
        attributionControl: false,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap',
    }).addTo(map);
}

function getMap() {
    if (!map) throw new Error("Map not initialized");
    return map;
}

export function addLocationMarker(coords) {
    return L.marker([coords.lat, coords.lng]).addTo(getMap());
}

export function centerMap(coords, zoom = 16) {
    getMap().setView([coords.lat, coords.lng], zoom);
}
