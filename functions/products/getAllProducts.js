"use strict";
exports.__esModule = true;
exports.getAllProducts = void 0;
var getAll_1 = require("../utils/getAll");
/**
 * Fetches all products, 250 at a time recursively
 * @param {*} params
 * @returns resolves with an array of product objects
 */
exports.getAllProducts = (0, getAll_1.getAll)("/catalog/products");
