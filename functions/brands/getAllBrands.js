"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBrands = void 0;
const getAll_1 = require("../utils/getAll");
/**
 * This function fetches all brands resolves with an array of objects
 * @param {object} params
 * @returns
 */
exports.getAllBrands = (0, getAll_1.getAll)("/catalog/brands");
