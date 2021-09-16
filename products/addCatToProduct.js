const { updateProduct } = require("../products/updateProduct");
const { getProductById } = require("../products/getProductById");
/**
 *
 * @param {number} productId
 * @param {number} catId
 * @returns promise
 */
const addCatToProduct = (productId, catId) =>
  new Promise((resolve, reject) => {
    // get product categories
    getProductById(productId).then((product) => {
      // check if already in category
      if (product.categories.includes(catId))
        return reject("product already associated with this category");
      const updatedCategories = [...product.categories, catId];
      // add category
      updateProduct(productId, { categories: updatedCategories })
        .then(({ status }) => resolve(status))
        .catch(reject);
    }).catch((err) => reject(err))
  });

exports.addCatToProduct = addCatToProduct;
