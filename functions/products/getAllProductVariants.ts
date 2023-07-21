import { getProductVariants } from "./getProductVariants";
import { getAllProducts } from "./getAllProducts";
import { ProductVariant } from "../product-variants/ProductVariant";

export function getAllProductVariants(params?: any, batchSize = 50): Promise<ProductVariant[]> {
  return new Promise(async function (resolve, reject) {
    try {
      let count = 0;
      const products = (await getAllProducts(params)) as any[];

      const batches = [];
      const allVariants = []
      

      for (let x = 0; x < products.length; x += batchSize) {
        batches.push(products.slice(x, x + batchSize));
      }

      for (const productBatch of batches) {
        const promises = [];
        for (const product of productBatch) {
          promises.push(getProductVariants(product.id));
          count++;
        }
        const batchVars = await Promise.all(promises);
        allVariants.push(...batchVars.flat())
      }

      

      resolve(allVariants);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}
/**
 * const product = products[x];
        const variants = (await getProductVariants(product.id)) as any[];
        allVariants.push(...variants);
        console.clear();
        
 */
