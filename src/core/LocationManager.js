// @ts-check

import { updateLocationUI } from "../ui/updateLocationUI.js";
import { LocationEntity } from "./LocationEntity.js";
import { centerMap } from "./MapController.js";

export class LocationManager {
    /**
     * @param {LocationEntity[]} locations
     */
    constructor(locations) {
        this.locations = locations;
        this.activeIndex = 0;

        document.addEventListener('location:selected', (e) => {
            const loc = e.detail;
            this.setActive(loc.index);
        });

        document.addEventListener('location:statusChanged', () => {
            this.updateUI();
        });
    }

    /**
     * @param {number} index
     */
    setActive(index) {
        this.activeIndex = index;
        this.centerMap();
        this.updateUI();
    }

    centerMap() {
        const loc = this.getActive();
        if (!loc) return;
        centerMap(loc.data.coordinates);
    }

    updateUI() {
        const loc = this.getActive();
        if (!loc) return;

        updateLocationUI({
            location: loc,
            hasPrev: this.activeIndex > 0,
            hasNext: this.activeIndex < this.locations.length - 1,
            onPrev: () => this.setActive(this.activeIndex - 1),
            onNext: () => this.setActive(this.activeIndex + 1),
            onToggleCompleted: () => loc.toggleCompleted()
        });
    }

    getActive() {
        return this.locations[this.activeIndex];
    }

    resetProgress() {
        if (!confirm("Are you sure you want to reset all progress?")) return;

        for (const loc of this.locations) {
            loc.unsetCompleted();
        }

        this.setActive(0);
    }
}
