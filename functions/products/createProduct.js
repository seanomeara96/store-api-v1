"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const createProduct = (productCreationFields) => new Promise((resolve, reject) => {
    require("../../config/config")
        .store.post("/catalog/products", productCreationFields)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
});
exports.createProduct = createProduct;
