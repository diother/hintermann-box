// @ts-check

import { safe } from "./helpers.js";

export function initLocationPanelBehavior() {
    const panel = safe('[data-location-panel]');

    const MAX_OFFSET = panel.clientHeight * 0.8;
    const MIN_OFFSET = 0;
    const RUBBER_BAND_RESISTANCE = 0.35;

    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let startOffset = 0;

    panel.addEventListener('pointerdown', (e) => {
        isDragging = true;
        startY = e.clientY;

        const currentTransform = getComputedStyle(panel).transform;
        startOffset = parseCurrentY(currentTransform);

        panel.style.transition = 'none';
        panel.setPointerCapture(e.pointerId);

        document.body.classList.add('dragging');
    });

    panel.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        currentY = e.clientY;

        const deltaY = currentY - startY;
        let newOffset = startOffset + deltaY;

        // Rubber band logic
        if (newOffset < MIN_OFFSET) {
            const excess = newOffset - MIN_OFFSET;
            newOffset = MIN_OFFSET + excess * RUBBER_BAND_RESISTANCE;
        } else if (newOffset > MAX_OFFSET) {
            const excess = newOffset - MAX_OFFSET;
            newOffset = MAX_OFFSET + excess * RUBBER_BAND_RESISTANCE;
        }

        panel.style.transform = `translateY(${newOffset}px)`;
    });

    panel.addEventListener('pointerup', (e) => {
        isDragging = false;
        panel.releasePointerCapture(e.pointerId);

        const deltaY = currentY - startY;
        const shouldMinimize = deltaY > 50;

        panel.style.transition = '';
        panel.style.transform = '';
        panel.classList.toggle('location-panel--minimized', shouldMinimize);

        document.body.classList.remove('dragging');
    });
}

/**
 * Extracts the Y offset from a CSS transform matrix string.
 * @param {string} transform
 * @returns {number}
 */
function parseCurrentY(transform) {
    if (transform === 'none') return 0;
    const match = transform.match(/matrix\(([^)]+)\)/);
    if (!match) return 0;

    const values = match[1].split(', ');
    return parseFloat(values[5]); // matrix(a, b, c, d, e, **f**) → f = translateY
}
