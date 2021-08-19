/**
 * gets filters of a product by id
 * @param {number} productId
 * @returns
 */
const getFilters = (productId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await require("../config/config").store.get(
        `/catalog/products/${productId}/custom-fields`
      );
      resolve({product_id: productId, filters: response.data.data});
    } catch (err) {
      reject(err);
    }
  });
// export module
exports.getFilters = getFilters;
