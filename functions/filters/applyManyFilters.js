"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyManyFilters = void 0;
const applyFilter_1 = require("./applyFilter");
/**
 * Loops through an array of many filters and applys them to a single product
 * @param {object[]} productId
 * @param {object[]} filters
 * @returns
 */
const applyManyFilters = (productId, filters) => new Promise((resolve, reject) => {
    const promises = filters.map(({ name, value }) => {
        return (0, applyFilter_1.applyFilter)(productId, name, value);
    });
    Promise.allSettled(promises)
        .then((results) => resolve(results))
        .catch(reject);
});
exports.applyManyFilters = applyManyFilters;
