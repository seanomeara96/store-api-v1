const { updateAProductVariant } = require("./updateAProductVariant");
/**
 * 
 * @param {number} productId 
 * @param {number} variantId 
 * @param {string} barcode 
 * @returns 
 */
const updateProductVariantBarcode = (productId, variantId, barcode) => {
  return new Promise((resolve, reject) => {
    updateAProductVariant(productId, variantId, { upc: barcode })
      .then(resolve)
      .catch(reject);
  });
};
exports.updateProductVariantBarcode = updateProductVariantBarcode;
