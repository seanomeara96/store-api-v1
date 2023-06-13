import { Product } from "./Product";
import { getProductById } from "./getProductById";
import { getProductIdFromSku } from "./getProductIdFromSku";

export function getProductBySku(sku: string):Promise<Product> {
  return new Promise(async function (resolve, reject) {
    try {
      const id = (await getProductIdFromSku(sku)) as number;
      const product = await getProductById(id);
      resolve(product)
    } catch (err) {
      reject(err);
    }
  });
}
