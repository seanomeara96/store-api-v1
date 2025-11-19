import { updateProduct } from "./updateProduct";
import { getProductById } from "./getProductById";
/**
 *
 * @param {number} productId
 * @param {number} catId
 * @returns promise
 */
export async function addCatToProduct(productId: number, catId: number) {
  try {
    // get product categories
    const product = await getProductById(productId);

    // check if already in category
    if (product.categories.includes(catId)) return;

    const updatedCategories = [...product.categories, catId];
    // add category
    await updateProduct(productId, { categories: updatedCategories });
  } catch (err) {
    throw err;
  }
}
