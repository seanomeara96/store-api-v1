import { NewImageParams } from "../products/createProduct";
/**
 * copied to client.ts
 * @param product_id 
 * @param params 
 * @returns 
 */
export function createProductImage(
  product_id: number,
  params: NewImageParams
): Promise<undefined> {
  return new Promise(async function (resolve, reject) {
    try {
      await require("../../config/config").store.post(
        `/catalog/products/${product_id}/images`,
        params
      );
      resolve(undefined);
    } catch (err) {
      reject(err);
    }
  });
}
