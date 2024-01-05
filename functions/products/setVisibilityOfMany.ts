import { productIsVisible } from "./productIsVisible";
/**
 * set visibility of many products to either true (visible) or false (not visible)
 * @param {object[]} productIds
 * @param {boolean} is_visible
 * @returns promise
 */
export function setVisibilityOfMany(productIds: number[], is_visible: boolean) {
  return new Promise(async function (resolve, reject) {
    try {
      for (const id of productIds) {
        await productIsVisible(id, is_visible);
      }
    } catch (err) {
      reject(err);
    }
  });
}
