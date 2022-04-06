"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFilterFromMany = void 0;
const removeFilter_1 = require("./removeFilter");
const productIDs = [
    { "Product ID": 177 },
    { "Product ID": 178 },
    { "Product ID": 179 },
    { "Product ID": 180 },
    { "Product ID": 181 },
];
const removeFilterFromMany = (productIds, name, value) => new Promise((resolve, reject) => {
    let promises = productIds.map((product) => {
        let idNumber = Object.values(product)[0];
        return (0, removeFilter_1.removeFilter)(idNumber, name, value);
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
});
exports.removeFilterFromMany = removeFilterFromMany;
