"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByCategory = void 0;
const getAllProducts_1 = require("./getAllProducts");
const getProductsByCategory = (category_id) => new Promise((resolve, reject) => (0, getAllProducts_1.getAllProducts)({ "categories:in": category_id }).then(resolve).catch(reject));
exports.getProductsByCategory = getProductsByCategory;
