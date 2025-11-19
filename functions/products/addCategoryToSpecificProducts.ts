import { addCatToProduct } from "./addCatToProduct";

/**
 * This needs to be tested before using
 * @param {object[]} productIds
 * @param {number} categoryId
 * @returns
 */
export async function addCategoryToSpecificProducts(
  productIds: { [key: string]: number }[],
  categoryId: number,
) {
  if (!Array.isArray(productIds) || typeof categoryId !== "number") {
    throw new Error("please check paramters");
  }

  const promises = productIds.map((productId) => {
    const id = productId[Object.keys(productId)[0]];
    if (typeof id !== "number") {
      throw new Error("product id must be a number");
    }
    return addCatToProduct(id, categoryId);
  });

  return Promise.allSettled(promises);
}
