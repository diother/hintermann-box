// @ts-check

import { isLocationCompleted, setLocationCompleted } from "../utils/storage.js";
import { addLocationMarker } from "./MapController.js";

export class LocationEntity {
    /**
     * @param {Loc} data - The raw location data
     * @param {number} index - Position in the route
     */
    constructor(data, index) {
        this.data = data;
        this.index = index;
        this.completed = isLocationCompleted(data.id);
        this.marker = null;
        this.image = `/static/media/${data.id}.webp`;
        this.wazeLink = `https://waze.com/ul?ll=${data.coordinates.lat},${data.coordinates.lng}&navigate=yes`;
    }

    initMarker() {
        this.marker = addLocationMarker(this.data.coordinates);
        this.marker.on("click", () => this.select());
    }

    toggleCompleted() {
        this.completed = !this.completed;
        setLocationCompleted(this.data.id, this.completed);
        this.emit('statusChanged');
    }

    unsetCompleted() {
        this.completed = false;
        setLocationCompleted(this.data.id, false);
        this.emit('statusChanged');
    }

    select() {
        this.emit('selected');
    }

    /**
     * @param {'selected' | 'statusChanged'} type
     */
    emit(type) {
        document.dispatchEvent(new CustomEvent(`location:${type}`, {
            detail: this
        }));
    }
}
