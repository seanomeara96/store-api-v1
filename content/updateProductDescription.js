const { updateProduct } = require("../products/updateProduct");
/**
 * updates product description
 * @param {number} productId
 * @param {string} updatedProductDescription
 * @returns
 */
const updateProductDescription = (productId, updatedProductDescription) => {
  return new Promise((resolve, reject) => {
    updateProduct(productId, {
      description: updatedProductDescription,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

exports.updateProductDescription = updateProductDescription;
