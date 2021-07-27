const { updateProduct } = require("../products/updateProduct");
const { getProductById } = require("../products/getProductById");
/**
 *
 * @param {number} productId
 * @param {number} catIdToRemove
 * @returns promise
 */
exports.removeCatFromProduct = (productId, catIdToRemove) => {
  return new Promise((resolve, reject) => {
    // get product categories
    getProductById(productId).then((product) => {
      // check if already in category
      if (!product.categories.includes(catIdToRemove))
        return reject("product already not associated with this category");

      const updatedCategories = product.categories.filter(
        (catId) => catId !== catIdToRemove
      );

      // remove category
      updateProduct(productId, { categories: updatedCategories })
        .then((res) => resolve(res.status))
        .catch((err) => reject(err));
    });
  });
};
