require("../../config/config").config("pb");
import { Product } from "../../functions/products/Product";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { updateProduct } from "../../functions/products/updateProduct";
const { log } = console;

/**
 * returns a function that sets a retial price to 0
 * @param {number} param0 product id
 * @returns
 */

function fetchNonZeroRetailPrices(): Promise<Product[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await getAllProducts();
      // retail price must be zero
      const nonZeroRetailPrices = products.filter(
        (product) => product.retail_price > 0
      );
      resolve(nonZeroRetailPrices);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * removes retail prices
 */
async function main() {
  try {
    const nonZeroRetailPrices = await fetchNonZeroRetailPrices();
    log(`${nonZeroRetailPrices.length} need to be updated`);
    
    
    const promises = [];
    for (const product of nonZeroRetailPrices) {
      const promise = updateProduct(product.id, { retail_price: 0 });
      promises.push(promise);
    }
    await Promise.allSettled(promises);


    const secondCheck = await fetchNonZeroRetailPrices();
    log(`${secondCheck.length} still need to be updated. Something went wrong`);
  } catch (err) {
    log(err);
  }
}

main();
