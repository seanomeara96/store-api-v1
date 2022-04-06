/**
 * updates a product. must supply a valid field
 * @param {number} productId
 * @param {object} fieldToUpdate
 * @returns promise
 */
export const updateProduct = (productId: number, fieldToUpdate: any) =>
  new Promise((resolve, reject) => {
    if (typeof productId !== "number")
      return reject("product id must be a number");
    if (typeof fieldToUpdate !== "object")
      return reject("field to update must be an object");
    require("../../config/config")
      .store.put(`/catalog/products/${productId}`, {
        ...fieldToUpdate,
      })
      .then(resolve)
      .catch((err:any) => reject(err.response.data));
  });

