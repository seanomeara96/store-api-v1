import { getAllProducts } from "../../functions/products/getAllProducts";
import { ProductVariant } from "../../newclient/products/variants";

import { getProductVariants } from "./getProductVariants";

export async function getStoreSKUs(
  batchSize: number,
  filterLive: boolean = false,
): Promise<ProductVariant[]> {
  try {
    const products = filterLive
      ? (await getAllProducts()).filter(function (product) {
          return product.is_visible;
        })
      : await getAllProducts();
    const variants = [];
    const batches = [];

    for (let i = 0; i < products.length; i += batchSize) {
      batches.push(products.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      const promises = batch.map(function (product) {
        return getProductVariants(product.id);
      });
      const responses = await Promise.allSettled(promises);

      if (
        responses.filter(function (response) {
          return response.status === "rejected";
        }).length
      )
        throw new Error("requests for variants was rejected");

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
    return variantSKUs;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default getStoreSKUs;
