import { getBrandIdByName } from "../brands/getBrandIdByName";
import { Product } from "./Product";
import { getAllProducts } from "./getAllProducts";
/**
 * Fetches all products by brand name, resolves with an array of objects
 * @param {string} name name of brand
 * @returns
 */
export function getProductsByBrand(name: string): Promise<Product[]> {
  return new Promise(async function (resolve, reject) {
    try {
      const brand_id = await getBrandIdByName(name);
      const res = await getAllProducts({ brand_id });
      resolve(res as Product[]);
    } catch (err) {
      reject(err);
    }
  });
}
