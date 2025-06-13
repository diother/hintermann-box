import { getSavedRouteId, saveRouteId } from "./state.js"
import { showRoutePrompt, updateLocationUI } from "./ui.js"
import { loadRoutes, loadLocations } from "./data.js"
import { initMap, addLocationMarker, centerMap } from "./map.js"

async function main() {
  try {
    const routes = await loadRoutes();
    const savedRouteId = getSavedRouteId();

    if (savedRouteId) {
      initApp(savedRouteId, routes);
    } else {
      showRoutePrompt(routes, (selectedId) => {
        saveRouteId(selectedId);
        initApp(selectedId, routes);
      });
    }
  }
  catch (err) {
    console.error("main failed", err);
  }
}

async function initApp(routeId, routes) {
  const allLocations = await loadLocations();
  const route = routes.find(route => route.id === routeId);
  if (!route) throw new Error(`Route "${routeId}" not found`);

  const locations = route.locationIds.map(id => {
    const loc = allLocations[id];
    if (!loc) throw new Error(`Missing location: "${id}"`);
    return loc;
  })

  initMap(() => updateLocation(0, locations));

  locations.forEach((loc, index) => {
    addLocationMarker(loc, () => updateLocation(index, locations));
  });
}

function updateLocation(index, locations) {
  const location = locations[index];
  if (!location) return;

  centerMap(location);
  updateLocationUI(index, locations, updateLocation);
}

main();
