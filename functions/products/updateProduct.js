"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = void 0;
/**
 * updates a product. must supply a valid field
 * @param {number} productId
 * @param {object} fieldToUpdate
 * @returns promise
 */
const updateProduct = (productId, fieldToUpdate) => new Promise((resolve, reject) => {
    if (typeof productId !== "number")
        return reject("product id must be a number");
    if (typeof fieldToUpdate !== "object")
        return reject("field to update must be an object");
    require("../../config/config")
        .store.put(`/catalog/products/${productId}`, Object.assign({}, fieldToUpdate))
        .then(resolve)
        .catch((err) => reject(err.response.data));
});
exports.updateProduct = updateProduct;
