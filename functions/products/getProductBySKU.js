"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductBySKU = void 0;
/**
 *
 * @param {string} sku
 * @returns product object
 */
const getProductBySKU = (sku) => new Promise((resolve, reject) => require("../../config/config")
    .store.get(`/catalog/products/`, {
    params: {
        sku
    }
})
    .then((response) => resolve(response.data.data))
    .catch((ex) => reject(ex.response)));
exports.getProductBySKU = getProductBySKU;
