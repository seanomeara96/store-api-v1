"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberOfImages = void 0;
const getAllProductImages_1 = require("./getAllProductImages");
/**
 * returns the number of images a product has
 * @param {number} product_id
 * @returns
 */
const getNumberOfImages = (product_id) => new Promise((resolve, reject) => {
    (0, getAllProductImages_1.getAllProductImages)(product_id)
        .then(({ images }) => resolve({
        product_id,
        "#images": images.length,
    }))
        .catch(reject);
});
exports.getNumberOfImages = getNumberOfImages;
