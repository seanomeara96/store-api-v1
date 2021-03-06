"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductImages = void 0;
/**
 * Gets all images of a given product by id
 * @param {number} product_id
 * @returns
 */
const getAllProductImages = (product_id) => new Promise((resolve, reject) => {
    if (typeof product_id !== "number")
        reject("product id must be a number");
    require("../../config/config")
        .store.get(`/catalog/products/${product_id}/images`)
        .then((res) => resolve({ product_id, images: res.data.data }))
        .catch((err) => reject(err));
});
exports.getAllProductImages = getAllProductImages;
