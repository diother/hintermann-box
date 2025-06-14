// types/global.d.ts

export { };

declare global {
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
     * Map of location ID to RawLocation
     */
    type LocationMap = Record<string, RawLocation>;

    /**
     * Map of completed location IDs
     */
    type CompletedMap = Record<string, true>;

    /**
     * A route made up of location IDs.
     */
    interface Route {
        id: string;
        name: string;
        locationIds: string[];
    }
    interface DocumentEventMap {
        'location:selected': CustomEvent<LocationEntity>;
        'location:statusChanged': CustomEvent<LocationEntity>;
    }
}
