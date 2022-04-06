"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAProductVariant = void 0;
const updateAProductVariant = (product_id, variant_id, fieldToUpdate) => {
    return new Promise((resolve, reject) => {
        if (typeof fieldToUpdate !== "object" && !Array.isArray(fieldToUpdate)) {
            return reject("field(s) to update must be an object and not an array");
        }
        if (typeof product_id !== "number") {
            return reject("product id must be a number");
        }
        if (typeof variant_id !== "number") {
            return reject("variant id must be a number");
        }
        require("../../config/config")
            .store.put(`/catalog/products/${product_id}/variants/${variant_id}`, Object.assign({}, fieldToUpdate))
            .then(resolve)
            .catch(reject);
    });
};
exports.updateAProductVariant = updateAProductVariant;
