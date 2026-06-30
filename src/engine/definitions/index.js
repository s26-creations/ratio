/**
 * Unit definition registry with lazy-loading support.
 * 
 * Currently all modules are loaded eagerly for simplicity since the total
 * payload is small (~13 KB). The architecture supports future lazy-loading
 * by replacing eager imports with dynamic imports when the definition set
 * grows large enough to warrant code-splitting.
 */

import { mechanics } from './mechanics.js';
import { electromagnetism } from './electromagnetism.js';
import { thermodynamics } from './thermodynamics.js';
import { chemistry } from './chemistry.js';
import { computing } from './computing.js';
import { physicsMisc } from './physics-misc.js';
import { fuel } from './fuel.js';
import { typography } from './typography.js';
import { cooking } from './cooking.js';

/**
 * Module registry — maps module names to their definition objects.
 * To add lazy-loading in the future, replace these with dynamic import functions:
 *   mechanics: () => import('./mechanics.js').then(m => m.mechanics)
 */
const definitionModules = {
    mechanics,
    electromagnetism,
    thermodynamics,
    chemistry,
    computing,
    physicsMisc,
    fuel,
    typography,
    cooking
};

// Cache: maps individual category keys to their definition objects
const categoryCache = {};
let allLoaded = false;

/**
 * Load all definition modules into the cache.
 * Called once on first access to getCategories() or similar bulk operations.
 */
function loadAllDefinitions() {
    if (allLoaded) return;

    for (const [, moduleExport] of Object.entries(definitionModules)) {
        const categories = typeof moduleExport === 'function' ? moduleExport() : moduleExport;
        for (const [categoryKey, categoryDef] of Object.entries(categories)) {
            categoryCache[categoryKey] = categoryDef;
        }
    }

    allLoaded = true;
}

// Eagerly load all definitions on first import (fast, ~13 KB total)
loadAllDefinitions();

/**
 * Definitions object — provides access to all unit categories.
 * Uses a Proxy to support future lazy-loading by category key.
 */
export const definitions = new Proxy(categoryCache, {
    get(target, key) {
        // Support standard object operations
        if (key === Symbol.iterator || key === Symbol.toPrimitive || key === 'toJSON') {
            return undefined;
        }

        // Ensure all definitions are loaded for enumeration
        if (key === '__proto__' || typeof key === 'symbol') {
            return Reflect.get(target, key);
        }

        return target[key];
    },

    ownKeys() {
        loadAllDefinitions();
        return Object.keys(categoryCache);
    },

    getOwnPropertyDescriptor(target, key) {
        if (key in target) {
            return {
                configurable: true,
                enumerable: true,
                value: target[key],
                writable: false
            };
        }
        return undefined;
    },

    has(target, key) {
        return key in target;
    }
});

export default definitions;
