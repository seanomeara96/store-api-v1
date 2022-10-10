"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategoryFromSpecificProducts = void 0;
const removeCatFromProduct_1 = require("./removeCatFromProduct");
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */
/**
 * This needs to be tested before using
 * @param {*} productIds
 * @param {*} categoryName
 * @returns
 */
const removeCategoryFromSpecificProducts = (productIds, categoryId) => new Promise((resolve, reject) => Promise.allSettled(productIds.map((productId) => (0, removeCatFromProduct_1.removeCatFromProduct)(Object.values(productId)[0], categoryId)))
    .then(resolve)
    .catch(reject));
exports.removeCategoryFromSpecificProducts = removeCategoryFromSpecificProducts;
