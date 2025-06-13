let map;

export function initMap(onInit) {
  map = L.map("map");

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap',
  }).addTo(map);

  onInit();
}

export function addLocationMarker(location, onClick) {
  L.marker([location.coordinates.lat, location.coordinates.lng])
    .addTo(map)
    .on('click', onClick);
}

export function centerMap(location) {
  map.setView([location.coordinates.lat, location.coordinates.lng], 16);
}
