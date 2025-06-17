// @ts-check

import { LocationEntity } from "./core/LocationEntity.js";
import { LocationManager } from "./core/LocationManager.js";
import { initMap } from "./core/MapController.js";
import { showRoutePrompt } from "./ui/ui.js";
import { loadLocations, loadRoutes } from "./utils/dataLoader.js";
import { getSavedRouteId, saveRouteId } from "./utils/storage.js";

async function main() {
    try {
        const routes = await loadRoutes();
        const savedId = getSavedRouteId();

        if (savedId) {
            await initApp(savedId, routes);
        } else {
            showRoutePrompt(routes,
                /** 
                 * Callback when a route is selected 
                 * @param {string} chosenId
                 */
                async (chosenId) => {
                    saveRouteId(chosenId);
                    await initApp(chosenId, routes);
                }
            );
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
    const allLocations = await loadLocations();

    const route = routes.find(r => r.id === routeId);
    if (!route) throw new Error(`Missing route: ${routeId}`);

    /** @type {LocationEntity[]} */
    const entities = route.locationIds.map((id, i) => {
        const raw = allLocations[id];
        if (!raw) throw new Error(`Location ${id} missing`);
        return new LocationEntity({ id, ...raw }, i);
    });

    const manager = new LocationManager(entities);

    initMap(() => manager.setActive(0));

    entities.forEach(loc => loc.initMarker());
}

main();

