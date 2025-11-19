import { productIsVisible } from "./productIsVisible";
/**
 * set visibility of many products to either true (visible) or false (not visible)
 * @param {object[]} productIds
 * @param {boolean} is_visible
 * @returns promise
 */
export async function setVisibilityOfMany(
  productIds: number[],
  is_visible: boolean,
) {
  try {
    for (const id of productIds) {
      await productIsVisible(id, is_visible);
    }
  } catch (err) {
    throw err;
  }
}
