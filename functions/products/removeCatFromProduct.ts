import { updateProduct } from "../products/updateProduct";
import { getProductById } from "../products/getProductById";
/**
 *
 * @param {number} pID
 * @param {number} cID
 * @returns promise
 */
export function removeCatFromProduct(pID: number, cID: number): Promise<void> {
  return new Promise(async function (resolve, reject) {
    try {
      if (typeof pID !== "number") {
        return reject("product id must be a number");
      }
      // get product categories
      const product = await getProductById(pID);
      if (!product.categories.includes(cID)) {
        return resolve();
      }

      // filter out id to remove
      const updatedCategories = product.categories.filter((id) => id !== cID);

      // remove category
      await updateProduct(pID, { categories: updatedCategories });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
