// @ts-check

import { LocationEntity } from "../core/LocationEntity.js";
import { safe } from "./helpers.js";

/**
 * @param {() => void} onChange
 */
export function initRouteChangeBtn(onChange) {
    safe('[data-change-route]').onclick = onChange;
}

/**
 * @param {Route[]} routes
 * @param {(id: string) => void} onSelect
 * @param {boolean} optional
 */
export function showRoutePrompt(routes, onSelect, optional = true) {
    const content = safe("[data-content]");
    const selector = safe("[data-route-selector]");
    const list = safe("[data-route-list]");

    content.style.position = "fixed";
    content.style.overflow = "hidden";
    selector.classList.remove("hidden");
    list.innerHTML = "";

    if (optional) {
        const closeBtn = safe("[data-route-selector-close]");
        closeBtn.classList.remove("hidden");
        closeBtn.onclick = () => {
            content.removeAttribute("style");
            selector.classList.add("hidden");
            closeBtn.classList.add("hidden");
        };
    }

    routes.forEach(route => {
        const btn = document.createElement("div");

        btn.classList.add("route-selector__option");
        btn.textContent = route.name;
        btn.onclick = () => onSelect(route.id)

        list.appendChild(btn);
    });
}

/**
 * @typedef {Object} LocationUIParams
 * @property {LocationEntity} location
 * @property {boolean} hasPrev
 * @property {boolean} hasNext
 * @property {() => void} onPrev
 * @property {() => void} onNext
 * @property {() => void} onToggleCompleted
 */

/**
 * @param {LocationUIParams} params
 */
export function updateLocationUI(params) {
    const { location, hasPrev, hasNext, onPrev, onNext, onToggleCompleted } = params;
    const { data, completed, image, wazeLink } = location;

    safe('[data-location-title]').textContent = data.name;
    safe('[data-location-address]').textContent = data.address;
    safe('[data-location-image]', HTMLImageElement).src = image;
    safe('[data-location-waze]', HTMLAnchorElement).href = wazeLink;

    const toggleBtn = safe('[data-location-toggle]');
    toggleBtn.classList.toggle('location-nav__button--active', completed);
    toggleBtn.onclick = onToggleCompleted;

    const prevBtn = safe('[data-location-prev]', HTMLButtonElement);
    const nextBtn = safe('[data-location-next]', HTMLButtonElement);

    prevBtn.disabled = !hasPrev;
    nextBtn.disabled = !hasNext;
    prevBtn.classList.toggle('location-nav__button--disabled', !hasPrev);
    nextBtn.classList.toggle('location-nav__button--disabled', !hasNext);
    prevBtn.onclick = onPrev;
    nextBtn.onclick = onNext;
}

/**
 * @typedef {Object} ProgressUIParams
 * @property {number} completed
 * @property {number} total
 * @property {boolean} canReset
 * @property {() => void} onReset
 */

/**
 * @param {ProgressUIParams} params
 */
export function updateProgressUI(params) {
    const { completed, total, canReset, onReset } = params;

    safe('[data-progress]').textContent = `${completed} / ${total}`;

    const resetBtn = safe('[data-progress-reset]');
    resetBtn.onclick = canReset ? onReset : () => { };
    resetBtn.classList.toggle("progress-panel__reset--disabled", !canReset);
}
