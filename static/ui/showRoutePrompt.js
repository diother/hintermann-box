// @ts-check 

import { safe } from "./domHelpers.js";

/**
 * @param {Route[]} routes
 * @param {(id: string) => void} onSelect
 */
export function showRoutePrompt(routes, onSelect) {
    const selector = safe("[data-route-selector]");
    const list = safe("[data-route-list]");

    selector.classList.remove("hidden");
    list.innerHTML = "";

    routes.forEach(route => {
        const li = document.createElement("li");
        const btn = document.createElement("button");

        btn.textContent = route.name;
        btn.onclick = () => {
            selector.classList.add("hidden");
            onSelect(route.id);
        }

        li.appendChild(btn);
        list.appendChild(li);
    });
}
