"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = void 0;
/**
 *
 * @param {*} productId
 * @returns product object
 */
const getProductById = (productId) => new Promise((resolve, reject) => require("../../config/config")
    .store.get(`/catalog/products/${productId}`)
    .then((response) => resolve(response.data.data))
    .catch((ex) => reject(ex.response)));
exports.getProductById = getProductById;
