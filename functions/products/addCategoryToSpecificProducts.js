"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategoryToSpecificProducts = void 0;
const addCatToProduct_1 = require("./addCatToProduct");
/**
 * This needs to be tested before using
 * @param {object[]} productIds
 * @param {number} categoryId
 * @returns
 */
const addCategoryToSpecificProducts = (productIds, categoryId) => new Promise((resolve, reject) => {
    if (!Array.isArray(productIds) || typeof categoryId !== "number")
        return reject("please check paramters");
    const promises = productIds.map((productId) => {
        const id = productId[Object.keys(productId)[0]];
        if (typeof id !== "number")
            return reject("product id must be a number");
        return (0, addCatToProduct_1.addCatToProduct)(id, categoryId);
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
});
exports.addCategoryToSpecificProducts = addCategoryToSpecificProducts;
