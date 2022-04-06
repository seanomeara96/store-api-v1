"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFilter = void 0;
/**
 * updates a filter
 * @param {number} product_id
 * @param {number} custom_field_id
 * @param {string} name
 * @param {string} value
 * @returns
 */
const updateFilter = (product_id, custom_field_id, name, value) => new Promise((resolve, reject) => {
    require("../config/config")
        .store.put(`/catalog/products/${product_id}/custom-fields/${custom_field_id}`, { name, value })
        .then(resolve)
        .catch(reject);
});
exports.updateFilter = updateFilter;
