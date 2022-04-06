"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiltersOfMany = void 0;
const getFilters_1 = require("./getFilters");
const productIds = [
    { "Product ID": 2541 },
    { "Product ID": 2542 },
];
/**
 * Supply product Ids and receive associated filters in a
 * Not quite sure how I got this to work so dont touch it
 * @param {object[]} productIds
 * @returns
 */
const getFiltersOfMany = (productIds) => new Promise((resolve, reject) => {
    let promises = productIds.map((product) => (0, getFilters_1.getFilters)(Object.values(product)[0]));
    Promise.allSettled(promises)
        .then((res) => {
        // I dont know how I got this to stop throwing a type error
        const fulfilled = res.filter(({ status }) => status === "fulfilled");
        const filters = fulfilled.map((res) => res.value);
        resolve(filters);
    })
        .catch(reject);
});
exports.getFiltersOfMany = getFiltersOfMany;
