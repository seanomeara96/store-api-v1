"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeManyFilters = void 0;
const removeFilter_1 = require("./removeFilter");
const filters = [
    { name: "Proceive", value: "Women" },
    { name: "Proceive", value: "Men & Women" },
];
const removeManyFilters = (productId, filters) => new Promise((resolve, reject) => {
    let promises = filters.map(({ name, value }) => (0, removeFilter_1.removeFilter)(productId, name, value));
    Promise.allSettled(promises).then(resolve).catch(reject);
});
exports.removeManyFilters = removeManyFilters;
