import { updateProduct } from "./updateProduct";
import { getProductById } from "./getProductById";
/**
 *
 * @param {number} productId
 * @param {number} catId
 * @returns promise
 */
export const addCatToProduct = (productId: number, catId: number) =>
  new Promise((resolve, reject) => {
    // get product categories
    getProductById(productId)
      .then((product: any) => {
        // check if already in category
        if (product.categories.includes(catId))
          return reject("product already associated with this category");
        const updatedCategories = [...product.categories, catId];
        // add category
        updateProduct(productId, { categories: updatedCategories })
          .then((res: any) => resolve(res.status))
          .catch(reject);
      })
      .catch((err: any) => reject(err));
  });
