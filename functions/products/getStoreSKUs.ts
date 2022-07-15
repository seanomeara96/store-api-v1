import { getAllProducts } from "../../functions/products/getAllProducts";

import { getProductVariants } from "./getProductVariants";

function getStoreSKUs(interval: number) {
  return new Promise(async (resolve, reject) => {
    const products = await getAllProducts();
    const variants = [];
    const batches = [];

    for (let i = 0; i < products.length; i += interval) {
      batches.push(products.slice(i, i + interval));
    }

    for (const batch of batches) {
      const promises = batch.map((product) => getProductVariants(product.id));
      const responses = await Promise.allSettled(promises);

      if (responses.filter((response) => response.status === "rejected").length)
        return reject("requests for variants was rejected");

      const productVariants = (
        responses.filter(
          (response) => response.status === "fulfilled"
        ) as PromiseFulfilledResult<any>[]
      ).map((response) => response.value);

      variants.push(...productVariants);
    }

    const variantSKUs = variants.flat();
    resolve(variantSKUs);
  });
}


export default getStoreSKUs;