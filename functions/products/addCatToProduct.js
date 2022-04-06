"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCatToProduct = void 0;
const updateProduct_1 = require("./updateProduct");
const getProductById_1 = require("./getProductById");
/**
 *
 * @param {number} productId
 * @param {number} catId
 * @returns promise
 */
const addCatToProduct = (productId, catId) => new Promise((resolve, reject) => {
    // get product categories
    (0, getProductById_1.getProductById)(productId)
        .then((product) => {
        // check if already in category
        if (product.categories.includes(catId))
            return reject("product already associated with this category");
        const updatedCategories = [...product.categories, catId];
        // add category
        (0, updateProduct_1.updateProduct)(productId, { categories: updatedCategories })
            .then((res) => resolve(res.status))
            .catch(reject);
    })
        .catch((err) => reject(err));
});
exports.addCatToProduct = addCatToProduct;
