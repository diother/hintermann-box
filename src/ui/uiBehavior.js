// @ts-check

import { safe } from "./helpers.js";

export function initLocationPanelBehavior() {
    const panel = safe('[data-location-panel]');

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    panel.addEventListener('pointerdown', (e) => {
        isDragging = true;
        startY = e.clientY;
        panel.setPointerCapture(e.pointerId);
    });

    panel.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        currentY = e.clientY;
        const deltaY = currentY - startY;

        // Prevent excessive drag
        if (deltaY < 0 || deltaY + 100 > panel.clientHeight) return;

        panel.style.transform = `translateY(${deltaY}px)`;
    });

    panel.addEventListener('pointerup', (e) => {
        isDragging = false;
        panel.releasePointerCapture(e.pointerId);

        const deltaY = currentY - startY;

        // Decide snap point
        if (deltaY > 50) {
            panel.classList.add('location--minimized');
        } else {
            panel.classList.remove('location--minimized');
        }

        panel.style.transform = '';
    });
}
