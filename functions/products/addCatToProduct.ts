import { updateProduct } from "./updateProduct";
import { getProductById } from "./getProductById";
/**
 *
 * @param {number} productId
 * @param {number} catId
 * @returns promise
 */
export function addCatToProduct(productId: number, catId: number) {
  return new Promise(async function (resolve, reject) {
    try {
      // get product categories
      const product = await getProductById(productId);

      // check if already in category
      if (product.categories.includes(catId)) return resolve(undefined);
      const updatedCategories = [...product.categories, catId];
      // add category
      await updateProduct(productId, { categories: updatedCategories });
      resolve(undefined);
    } catch (err) {
      reject(err);
    }
  });
}
