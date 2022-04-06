"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstProductImage = void 0;
const getAllProductImages_1 = require("./getAllProductImages");
/**
 * gets image from product by id with sort order of zero
 * @param {number} product_id
 * @returns
 */
const getFirstProductImage = (product_id) => new Promise((resolve, reject) => {
    (0, getAllProductImages_1.getAllProductImages)(product_id)
        .then(({ images }) => resolve(images.filter((image) => image.sort_order === 0)))
        .catch(reject);
});
exports.getFirstProductImage = getFirstProductImage;
