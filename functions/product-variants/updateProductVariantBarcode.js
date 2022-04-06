"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductVariantBarcode = void 0;
const updateAProductVariant_1 = require("./updateAProductVariant");
/**
 *
 * @param {number} productId
 * @param {number} variantId
 * @param {string} barcode
 * @returns
 */
const updateProductVariantBarcode = (productId, variantId, barcode) => new Promise((resolve, reject) => {
    if (typeof barcode !== "string") {
        return reject("barcode must be a string");
    }
    if (typeof productId !== "number") {
        return reject("product id must be a number");
    }
    if (typeof variantId !== "number") {
        return reject("variant id must be a number");
    }
    (0, updateAProductVariant_1.updateAProductVariant)(productId, variantId, { upc: barcode })
        .then(resolve)
        .catch(reject);
});
exports.updateProductVariantBarcode = updateProductVariantBarcode;
