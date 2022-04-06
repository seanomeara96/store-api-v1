"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFilterToMany = void 0;
const applyFilter_1 = require("./applyFilter");
/**
 * applies a field (name) and value to multiple products by id
 * @param {object[]} productIds
 * @param {string} name
 * @param {string} value
 * @returns
 */
const applyFilterToMany = (productIds, name, value) => new Promise((resolve, reject) => {
    let promises = productIds.map((product) => {
        const idNumber = Object.values(product)[0];
        return (0, applyFilter_1.applyFilter)(idNumber, name, value);
    });
    Promise.allSettled(promises)
        .then((results) => resolve(results))
        .catch(reject);
});
exports.applyFilterToMany = applyFilterToMany;
