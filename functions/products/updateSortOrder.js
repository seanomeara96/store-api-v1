"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSortOrder = void 0;
const updateProduct_1 = require("./updateProduct");
/**
 * provide a product id and a sort order number to set
 * @param {number} productId
 * @param {number} sortOrderNumber
 * @returns
 */
const updateSortOrder = (productId, sortOrderNumber) => new Promise((resolve, reject) => {
    if (typeof productId !== "number" || typeof sortOrderNumber !== "number")
        return reject("please supply a number");
    (0, updateProduct_1.updateProduct)(productId, { sort_order: sortOrderNumber })
        .then(resolve)
        .catch(reject);
});
exports.updateSortOrder = updateSortOrder;
