import { productIsVisible } from "./productIsVisible";
/**
 * set visibility of many products to either true (visible) or false (not visible)
 * @param {object[]} productIds
 * @param {boolean} is_visible
 * @returns promise
 */
export const setVisibilityOfMany = (
  productIds: { [key: string]: number }[],
  is_visible: boolean
) =>
  new Promise((resolve, reject) =>
    Promise.allSettled(
      productIds.map((i) => productIsVisible(Object.values(i)[0], is_visible))
    )
      .then(resolve)
      .catch(reject)
  );
