import { Product } from "./Product";
import { getProductById } from "./getProductById";
import { getProductIdFromSku } from "./getProductIdFromSku";

export function getProductBySku(sku: string):Promise<Product | undefined> {
  return new Promise(async function (resolve, reject) {
    try {
      const id = (await getProductIdFromSku(sku))
      if(!id) {
        resolve(undefined)
        return
      }
      const product = await getProductById(id);
      resolve(product)
    } catch (err) {
      reject(err);
    }
  });
}
