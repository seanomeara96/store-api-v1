import { removeCatFromProduct } from "./removeCatFromProduct";
/**
 * issue with this script is that its prematurely returning an empty array and not the expected output from promise allsettled
 */

/**
 * This needs to be tested before using
 * @param {*} productIds
 * @param {*} categoryName
 * @returns
 */
export const removeCategoryFromSpecificProducts = (
  productIds: { [key: string]: number }[],
  categoryId: number
) =>
  new Promise((resolve, reject) =>
    Promise.allSettled(
      productIds.map((productId: { [key: string]: number }) =>
        removeCatFromProduct(Object.values(productId)[0], categoryId)
      )
    )
      .then(resolve)
      .catch(reject)
  );
