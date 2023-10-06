import { Product } from "./Product";
import { getAllProducts } from "./getAllProducts";

export function getProductByName(productName: string): Promise<Product> {
  return new Promise(async function (resolve, reject) {
    try {
      const products = await getAllProducts({ name: productName });
      resolve(products[0])
    } catch (err) {
      reject(err);
    }
  });
}
