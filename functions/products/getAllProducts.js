"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = void 0;
const getAll_1 = require("../utils/getAll");
/**
 * Fetches all products, 250 at a time recursively
 * @param {*} params
 * @returns resolves with an array of product objects
 */
exports.getAllProducts = (0, getAll_1.getAll)(`/catalog/products`);
