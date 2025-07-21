// @ts-check

import { LocationEntity } from "./core/LocationEntity.js";
import { LocationManager } from "./core/LocationManager.js";
import { initMap } from "./core/MapController.js";
import { initLocationPanelBehavior } from "./ui/uiBehavior.js";
import { initRouteChangeBtn, showRoutePrompt } from "./ui/ui.js";
import { loadLocations, loadRoutes } from "./utils/dataLoader.js";
import { getSavedRouteId, saveRouteId } from "./utils/storage.js";

async function main() {
    try {
        /** @type {Route[]} */
        const routes = await loadRoutes();
        const savedId = getSavedRouteId();

        if (savedId) {
            await initApp(savedId, routes);
        } else {
            showRoutePrompt(routes, handleRouteSelect, false);
        }
    } catch (err) {
        console.error('Fatal error', err);
    }
}

/**
 * @param {string} routeId
 * @param {Route[]} routes
 */
async function initApp(routeId, routes) {
    initRouteChangeBtn(() => showRoutePrompt(routes, handleRouteSelect));

    const route = routes.find(r => r.id === routeId);
    if (!route) throw new Error(`Missing route: ${routeId}`);

    /** @type {Object.<string, RawLocation>} */
    const allLocations = await loadLocations();

    /** @type {LocationEntity[]} */
    const entities = route.locationIds.map((id, i) => {
        const raw = allLocations[id];
        if (!raw) throw new Error(`Location ${id} missing`);
        return new LocationEntity({ id, ...raw }, i);
    });

    initMap();
    entities.forEach(loc => loc.initMarker());

    const manager = new LocationManager(entities);

    /** @type {number} */
    const firstActive =
        manager.getFirstIncompleteIndex() ??
        manager.locations.length - 1;

    manager.setActive(firstActive);
}

/** 
 * @param {string} chosenId 
 */
function handleRouteSelect(chosenId) {
    saveRouteId(chosenId);
    location.reload();
}

initLocationPanelBehavior();
main();
