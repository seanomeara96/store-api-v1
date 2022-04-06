"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrandIdByName = void 0;
const getBrandByName_1 = require("./getBrandByName");
/**
 * Fetches brand id by name & resolves with a number
 * @param {*} name
 * @returns
 */
const getBrandIdByName = (name) => new Promise((resolve, reject) => {
    (0, getBrandByName_1.getBrandByName)(name)
        .then((i) => resolve(i.id))
        .catch((err) => reject(err));
});
exports.getBrandIdByName = getBrandIdByName;
