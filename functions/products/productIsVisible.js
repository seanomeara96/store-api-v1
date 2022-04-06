"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productIsVisible = void 0;
const updateProduct_1 = require("./updateProduct");
const productIsVisible = (productId, is_visible) => new Promise((resolve, reject) => (0, updateProduct_1.updateProduct)(productId, {
    is_visible,
})
    .then(resolve)
    .catch(reject));
exports.productIsVisible = productIsVisible;
