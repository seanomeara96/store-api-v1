"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByCategory = void 0;
const getAllProducts_1 = require("./getAllProducts");
const getProductsByCategory = (category_id) => new Promise((resolve, reject) => {
    const filterCategoryProducts = (products) => products.filter((product) => product.categories.includes(category_id));
    (0, getAllProducts_1.getAllProducts)().then(filterCategoryProducts).catch(reject).then(resolve);
});
exports.getProductsByCategory = getProductsByCategory;
