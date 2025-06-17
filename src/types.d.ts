// types.d.ts

export { };

import type { LocationEntity } from "./core/LocationEntity.js"

declare global {
    /**
     * Array of location IDs based on route.
     */
    interface Route {
        id: string;
        name: string;
        locationIds: string[];
    }

    /**
     * Coordinates for a location.
     */
    interface Coordinates {
        lat: number;
        lng: number;
    }

    /**
     * A raw location object as loaded from JSON.
     */
    interface RawLocation {
        name: string;
        address: string;
        description: string;
        image: string;
        wazeLink: string;
        coordinates: Coordinates;
    }

    /**
     * A location with an ID (after processing).
     */
    interface Loc extends RawLocation {
        id: string;
    }

    /**
     * Events for LocationEntity
     */
    interface DocumentEventMap {
        'location:selected': CustomEvent<LocationEntity>;
        'location:statusChanged': CustomEvent<LocationEntity>;
    }
}
