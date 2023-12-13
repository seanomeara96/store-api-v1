/**
 * updates a product. must supply a valid field
 * @param {number} productId
 * @param {object} fieldToUpdate
 * @returns promise
 */
export function updateProduct(productId: number, fieldToUpdate: any) {
  return new Promise(async function (resolve, reject) {
    if (typeof productId !== "number")
      return reject("product id must be a number");

    if (typeof fieldToUpdate !== "object")
      return reject("field to update must be an object");

    try {
      const res = await require("../../config/config").store.put(
        `/catalog/products/${productId}`,
        {
          ...fieldToUpdate,
        }
      );
      resolve(res.data.data);
    } catch (err) {
      reject(err);
    }
  });
}
