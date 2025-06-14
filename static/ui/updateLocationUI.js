// @ts-check

import { LocationEntity } from "../core/LocationEntity.js";
import { safe } from "./domHelpers.js";

/**
 * @typedef {Object} UIParams
 * @property {LocationEntity} location
 * @property {boolean} hasPrev
 * @property {boolean} hasNext
 * @property {() => void} onPrev
 * @property {() => void} onNext
 * @property {() => void} onToggleCompleted
 */

/**
 * @param {UIParams} params
 */
export function updateLocationUI(params) {
    const { location, hasPrev, hasNext, onPrev, onNext, onToggleCompleted } = params;
    const { data, completed } = location;

    safe('[data-location-title]').textContent = data.name;
    safe('[data-location-address]').textContent = data.address;
    safe('[data-location-description]').textContent = data.description;
    safe('[data-location-image]', HTMLImageElement).src = `/images/${data.image}`;
    safe('[data-location-waze]', HTMLAnchorElement).href = data.wazeLink;

    const toggleBtn = safe('[data-location-toggle]');
    toggleBtn.textContent = completed ? 'Mark Incomplete' : 'Mark Complete';
    toggleBtn.classList.toggle('completed', completed);
    toggleBtn.onclick = onToggleCompleted;

    const prevBtn = safe('[data-location-prev]', HTMLButtonElement);
    const nextBtn = safe('[data-location-next]', HTMLButtonElement);

    prevBtn.disabled = !hasPrev;
    nextBtn.disabled = !hasNext;
    prevBtn.onclick = onPrev;
    nextBtn.onclick = onNext;

    safe('[data-location-panel]').classList.remove('hidden');
}
