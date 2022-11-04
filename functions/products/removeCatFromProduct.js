"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCatFromProduct = void 0;
const updateProduct_1 = require("../products/updateProduct");
const getProductById_1 = require("../products/getProductById");
/**
 *
 * @param {number} productId
 * @param {number} catIdToRemove
 * @returns promise
 */
const removeCatFromProduct = (productId, catIdToRemove) => {
    return new Promise((resolve, reject) => {
        if (typeof productId !== "number")
            return reject("product id must be a number");
        // get product categories
        (0, getProductById_1.getProductById)(productId)
            .then((product) => {
            // check if already in category
            if (!product.categories.includes(catIdToRemove))
                return reject("product already not associated with this category");
            const updatedCategories = product.categories.filter((catId) => catId !== catIdToRemove);
            // remove category
            (0, updateProduct_1.updateProduct)(productId, { categories: updatedCategories })
                .then((res) => resolve(res.status)) // ??  does this return undefined?
                .catch((err) => reject(err));
        })
            .catch(reject);
    });
};
exports.removeCatFromProduct = removeCatFromProduct;
