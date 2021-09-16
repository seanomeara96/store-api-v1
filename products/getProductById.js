/**
 *
 * @param {*} productId
 * @returns product object
 */
const getProductById = (productId) =>
  new Promise((resolve, reject) =>
    require("../config/config")
      .store.get(`/catalog/products/${productId}`)
      .then((response) => resolve(response.data.data))
      .catch(({ response }) => reject(response.data))
  );
exports.getProductById = getProductById;
