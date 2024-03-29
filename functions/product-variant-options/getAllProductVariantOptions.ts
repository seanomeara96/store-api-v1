import { ProductVariantOption } from "./ProductVariantOption";

/**
 * Copied to client.ts
 * @param product_id 
 * @returns 
 */
export function getAllProductVariantOptions(product_id: number):Promise<ProductVariantOption[]> {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.get(
        `/catalog/products/${product_id}/options`
      );
      resolve(res.data.data);
    } catch (err) {
      reject(err);
    }
  });
}
