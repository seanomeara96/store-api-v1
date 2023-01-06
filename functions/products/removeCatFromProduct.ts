import { updateProduct } from "../products/updateProduct";
import { getProductById } from "../products/getProductById";
/**
 *
 * @param {number} productId
 * @param {number} catIdToRemove
 * @returns promise
 */
export const removeCatFromProduct = (
  productId: number,
  catIdToRemove: number
) => {
  return new Promise((resolve, reject) => {
    if (typeof productId !== "number")
      return reject("product id must be a number");
    // get product categories
    getProductById(productId)
      .then((product: any) => {
        // check if already in category
        if (!product.categories.includes(catIdToRemove))
          return reject("product already not associated with this category");

        const updatedCategories = product.categories.filter(
          (catId: number) => catId !== catIdToRemove
        );

        // remove category
        updateProduct(productId, { categories: updatedCategories })
          .then((res: any) => resolve(res)) // ??  does this return undefined?
          .catch((err: any) => reject(err));
      })
      .catch(reject);
  });
};
