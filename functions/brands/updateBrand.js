"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBrand = void 0;
/**
 * updates a product. must supply a valid field
 * @param {number} productId
 * @param {object} fieldToUpdate
 * @returns promise
 */
const updateBrand = (brandId, fieldToUpdate) => new Promise((resolve, reject) => {
    if (typeof brandId !== "number")
        return reject("product id must be a number");
    if (typeof fieldToUpdate !== "object")
        return reject("field to update must be an object");
    require("../../config/config")
        .store.put(`/catalog/brands/${brandId}`, Object.assign({}, fieldToUpdate))
        .then((res) => resolve(res.data.data))
        .catch((err) => reject(err.response.data));
});
exports.updateBrand = updateBrand;
