"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByBrand = void 0;
const getBrandIdByName_1 = require("../brands/getBrandIdByName");
const getAllProducts_1 = require("./getAllProducts");
/**
 * Fetches all products by brand name, resolves with an array of objects
 * @param {string} name name of brand
 * @returns
 */
const getProductsByBrand = (name) => new Promise((resolve, reject) => (0, getBrandIdByName_1.getBrandIdByName)(name).then((brand_id) => (0, getAllProducts_1.getAllProducts)({ brand_id })
    .then((res) => resolve(res))
    .catch((err) => reject(err)))).catch(console.log);
exports.getProductsByBrand = getProductsByBrand;
