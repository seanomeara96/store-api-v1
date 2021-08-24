const { updateProduct } = require("../products/updateProduct");
/**
 * updates product barcode
 * @param {number} productId
 * @param {string} barcode number in string format
 * @returns
 */
const updateProductBarcode = (productId, updatedProductBarcode) => {
  return new Promise((resolve, reject) => {
    updateProduct(productId, {
      upc: updatedProductBarcode,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

exports.updateProductBarcode = updateProductBarcode;
