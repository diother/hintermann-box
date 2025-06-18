// @ts-check

import { updateLocationUI, updateProgressUI } from "../ui/ui.js";
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

    getActive() {
        return this.locations[this.activeIndex];
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

        const { completed, total } = this.getProgress();

        updateProgressUI({
            completed: completed,
            total: total,
            canReset: completed > 0,
            onReset: () => this.resetProgress()
        });
    }

    /**
     * @returns {{ completed: number, total: number }}
     */
    getProgress() {
        const total = this.locations.length;
        const completed = this.locations.filter(loc => loc.completed).length;
        return { completed, total };
    }

    resetProgress() {
        if (!confirm("Ești sigur că vrei să resetezi tot progresul pe această rută?")) return;
        for (const loc of this.locations) {
            loc.unsetCompleted();
        }
        this.setActive(0);
    }

    /**
     * @returns {number | null}
     */
    getFirstIncompleteIndex() {
        return this.locations.find(loc => !loc.completed)?.index ?? null;
    }
}
