/**
 * applies a field (name) and value to a product by id
 * @param {number} productId 
 * @param {string} name 
 * @param {string} value 
 * @returns 
 */
const applyFilter = (productId, name, value) =>
  new Promise(async (resolve, reject) => {
    const data = {
      name,
      value,
    };
    try {
      const { status } = await require("../config/config").store.post(
        `/catalog/products/${productId}/custom-fields`,
        data
      );
      resolve(status);
    } catch (err) {
      reject(err);
    }
  });
// export module
  exports.applyFilter = applyFilter;