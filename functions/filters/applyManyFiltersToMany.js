"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyManyFiltersToMany = void 0;
const applyManyFilters_1 = require("./applyManyFilters");
/**
 * for each product this function applies many filters
 * @param {object[]} productIds
 * @param {object[]} filters
 * @returns
 */
const applyManyFiltersToMany = (productIds, filters) => new Promise((resolve, reject) => {
    let promises = productIds.map((product) => {
        const idNumber = Object.values(product)[0];
        return (0, applyManyFilters_1.applyManyFilters)(idNumber, filters);
    });
    Promise.allSettled(promises)
        .then((results) => resolve(results))
        .catch(reject);
});
exports.applyManyFiltersToMany = applyManyFiltersToMany;
const productIDs = [
    { "Product ID": 177 },
    { "Product ID": 178 },
    { "Product ID": 179 },
    { "Product ID": 180 },
    { "Product ID": 181 },
];
const filters = [
    {
        name: "Proceive",
        value: "Men",
    },
    {
        name: "Proceive",
        value: "Women",
    },
    {
        name: "Proceive",
        value: "Men & Women",
    },
];
