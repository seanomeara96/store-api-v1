/**
 * applies a field (name) and value to a product by id
 * @param {number} productId 
 * @param {string} name 
 * @param {string} value 
 * @returns 
 */
export const applyFilter = (productId: number, name: string, value: string) =>
  new Promise(async (resolve, reject) => {
    const data = {
      name,
      value,
    };
    try {
      const { status } = await require("../../config/config").store.post(
        `/catalog/products/${productId}/custom-fields`,
        data
      );
      resolve(status);
    } catch (err) {
      reject(err);
    }
  });

