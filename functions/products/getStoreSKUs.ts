import { getAllProducts } from "../../functions/products/getAllProducts";
import { ProductVariant } from "../product-variants/ProductVariant";

import { getProductVariants } from "./getProductVariants";

export function getStoreSKUs(
  batchSize: number,
  filterLive: boolean = false
): Promise<ProductVariant[]> {
  return new Promise(async (resolve, reject) => {
    const products = filterLive
      ? (await getAllProducts()).filter((product) => product.is_visible)
      : await getAllProducts();
    const variants = [];
    const batches = [];

    for (let i = 0; i < products.length; i += batchSize) {
      batches.push(products.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      const promises = batch.map((product) => getProductVariants(product.id));
      const responses = await Promise.allSettled(promises);

      if (responses.filter((response) => response.status === "rejected").length)
        return reject("requests for variants was rejected");

      const productVariantsBatch: ProductVariant[][] = [];
      for (let ii = 0; ii < responses.length; ii++) {
        const response = responses[ii];
        if (response.status === "fulfilled") {
          productVariantsBatch.push(response.value);
        }
      }

      variants.push(...productVariantsBatch);
    }

    const variantSKUs = variants.flat();
    resolve(variantSKUs);
  });
}

export default getStoreSKUs;
