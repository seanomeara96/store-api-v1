"use strict";
exports.__esModule = true;
exports.getAllCategories = void 0;
var getAll_1 = require("../utils/getAll");
/**
 * This function fetches all categories resolves with an array of objects
 * @param {*} params
 * @returns
 */
exports.getAllCategories = (0, getAll_1.getAll)("/catalog/categories");
