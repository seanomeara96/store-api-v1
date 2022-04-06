"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryByName = void 0;
const getAllCategories_1 = require("./getAllCategories");
/**
 * Fetches a category object by name, if there are multiple it will reject
 * @param {*} name
 * @returns
 */
const getCategoryByName = (name) => new Promise((resolve, reject) => (0, getAllCategories_1.getAllCategories)({ name })
    .then((res) => {
    if (res.length > 1)
        return reject("there are multiple categories with this name");
    resolve(res[0]);
})
    .catch((err) => reject(err)));
exports.getCategoryByName = getCategoryByName;
