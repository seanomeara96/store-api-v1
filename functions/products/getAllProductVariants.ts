import { getProductVariants } from "./getProductVariants";
import { getAllProducts } from "./getAllProducts";

export function getAllProductVariants() {
  return new Promise(async function (resolve, reject) {
    const allVariants = [];
    const products = (await getAllProducts().catch(reject)) as any[];
    for (let x = 0; x < products.length; x++) {
      const product = products[x];
      const variants = (await getProductVariants(product.id).catch(
        reject
      )) as any[];
      allVariants.push(...variants);
      console.clear();
      console.log(`${x}/${products.length}`)
    }
    resolve(allVariants);
  });
}
