import { updateAProductVariant } from "./updateAProductVariant";
/**
 *
 * @param {number} productId
 * @param {number} variantId
 * @param {string} barcode
 * @returns
 */
export const updateProductVariantBarcode = (
  productId: number,
  variantId: number,
  barcode: string
) =>
  new Promise((resolve, reject) => {
    if (typeof barcode !== "string") {
      return reject("barcode must be a string");
    }
    if (typeof productId !== "number") {
      return reject("product id must be a number");
    }
    if (typeof variantId !== "number") {
      return reject("variant id must be a number");
    }
    updateAProductVariant(productId, variantId, { upc: barcode })
      .then(resolve)
      .catch(reject);
  });