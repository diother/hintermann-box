/**
 * @template {HTMLElement} T
 * @param {string} selector
 * @param {new () => T} type
 * @returns {T}
 */
export function safe(selector, type = HTMLElement) {
    const el = document.querySelector(selector);
    if (!(el instanceof type)) {
        throw new Error(`Expected ${selector} to be ${type.name}`);
    }
    return el;
}
