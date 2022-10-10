"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = void 0;
/**
 * updates a category. must supply a valid field
 * @param {number} catId
 * @param {object} fieldToUpdate
 * @returns promise
 */
const updateCategory = (catId, fieldToUpdate) => new Promise((resolve, reject) => {
    if (typeof catId !== "number")
        return reject("product id must be a number");
    if (typeof fieldToUpdate !== "object")
        return reject("field to update must be an object");
    require("../../config/config")
        .store.put(`/catalog/categories/${catId}`, Object.assign({}, fieldToUpdate))
        .then((res) => resolve(res.data.data))
        .catch((err) => reject(err.response.data));
});
exports.updateCategory = updateCategory;
