const store = require("../config/axios-config");
/**
 *
 * @param {*} productId
 * @returns product object
 */
exports.getProductById = (productId) =>
  new Promise((resolve, reject) =>
    store
      .get(`/catalog/products/${productId}`)
      .then((response) => resolve(response.data.data))
      .catch((err) => reject(err))
  );
