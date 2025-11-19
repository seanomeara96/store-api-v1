import { updateProduct } from "../products/updateProduct";
import { getProductById } from "../products/getProductById";
/**
 *
 * @param {number} pID
 * @param {number} cID
 * @returns promise
 */
export async function removeCatFromProduct(
  pID: number,
  cID: number,
): Promise<void> {
  if (typeof pID !== "number") {
    throw new Error("product id must be a number");
  }
  // get product categories
  const product = await getProductById(pID);
  if (!product.categories.includes(cID)) {
    return;
  }

  // filter out id to remove
  const updatedCategories = product.categories.filter(function (id) {
    return id !== cID;
  });

  // remove category
  await updateProduct(pID, { categories: updatedCategories });
}
