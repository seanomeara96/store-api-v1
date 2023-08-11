import { addCatToProduct } from "./addCatToProduct";

/**
 * This needs to be tested before using
 * @param {object[]} productIds
 * @param {number} categoryId
 * @returns
 */
export function addCategoryToSpecificProducts(
  productIds: { [key: string]: number }[],
  categoryId: number
) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(productIds) || typeof categoryId !== "number")
      return reject("please check paramters");
    const promises = productIds.map((productId) => {
      const id = productId[Object.keys(productId)[0]];
      if (typeof id !== "number") return reject("product id must be a number");
      return addCatToProduct(id, categoryId);
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });
}
