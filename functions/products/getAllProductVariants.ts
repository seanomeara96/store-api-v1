import { getProductVariants } from "./getProductVariants";
import { getAllProducts } from "./getAllProducts";
import { ProductVariant } from "../product-variants/ProductVariant";

export function getAllProductVariants(params?: any, batchSize = 50, wait = 0): Promise<ProductVariant[]> {
  return new Promise(async function (resolve, reject) {
    try {
      const products = (await getAllProducts(params)) as any[];
      const batches = [];
      const allVariants = [];

      for (let x = 0; x < products.length; x += batchSize) {
        batches.push(products.slice(x, x + batchSize));
      }

      for (const productBatch of batches) {
        const promises = [];
        for (const product of productBatch) {
          promises.push(getProductVariants(product.id));
        }
        const batchVars = await Promise.all(promises);
        allVariants.push(...batchVars.flat())
        if (wait > 0) {
          await new Promise(resolve => setTimeout(resolve, wait))
        }
      }
      resolve(allVariants);
    } catch (err) {
      reject(err);
    }
  });
}
