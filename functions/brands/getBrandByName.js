"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrandByName = void 0;
const getAllBrands_1 = require("./getAllBrands");
/**
 * Fetches a brand by name & resolves with a brand object
 * @param {*} name
 * @returns
 */
const getBrandByName = (name) => new Promise((resolve, reject) => {
    (0, getAllBrands_1.getAllBrands)({ name })
        .then((res) => resolve(res[0]))
        .catch((err) => reject(err));
});
exports.getBrandByName = getBrandByName;
