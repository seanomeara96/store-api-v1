const { updateProduct } = require("../products/updateProduct");
const { getProductById } = require("../products/getProductById");
/**
 * 
 * @param {number} productId 
 * @param {number} catId
 * @returns promise
 */
exports.addCatToProduct = (productId, catId) => {
  return new Promise((resolve, reject) => {
    // get product categories
    getProductById(productId).then((product) => {
      // check if already in category
      if (product.categories.includes(catId)) {
        return reject("product already associated with this category");
      }
      const updatedCategories = [...product.categories, catId];
      // add category
      updateProduct(productId, { categories: updatedCategories })
        .then((res) => resolve(res.status))
        .catch((err) => reject(err));
    });
  });
};
