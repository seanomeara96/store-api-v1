/**
 * updates a product. must supply a valid field
 * @param {number} productId 
 * @param {object} fieldToUpdate 
 * @returns promise
 */
exports.updateProduct = (productId, fieldToUpdate) => {
  return new Promise((resolve, reject) => {
    if (typeof productId !== "number") reject("product id must be a number");
    require("../config/config")
      .store.put(`/catalog/products/${productId}`, {
        ...fieldToUpdate,
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
