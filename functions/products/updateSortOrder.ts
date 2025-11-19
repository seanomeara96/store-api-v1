import { updateProduct } from "./updateProduct";
/**
 * provide a product id and a sort order number to set
 * @param {number} productId
 * @param {number} sortOrderNumber
 * @returns
 */
export async function updateSortOrder(
  productId: number,
  sortOrderNumber: number,
) {
  if (typeof productId !== "number" || typeof sortOrderNumber !== "number") {
    throw new Error("please supply a number");
  }
  try {
    await updateProduct(productId, { sort_order: sortOrderNumber });
  } catch (error) {
    throw error;
  }
}
