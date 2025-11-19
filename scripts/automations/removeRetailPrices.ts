require("../../config/config").config("kbsk");
import { Product } from "../../functions/products/Product";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { updateProduct } from "../../functions/products/updateProduct";
const { log } = console;

/**
 * returns a function that sets a retail price to 0
 * @param {number} param0 product id
 * @returns
 */

async function fetchNonZeroRetailPrices(): Promise<Product[]> {
  try {
    const products = await getAllProducts();
    // retail price must be zero
    const nonZeroRetailPrices = products.filter(function (product) {
      return product.retail_price > 0;
    });
    return nonZeroRetailPrices;
  } catch (err) {
    throw err;
  }
}

/**
 * removes retail prices
 */
async function main() {
  try {
    const nonZeroRetailPrices = await fetchNonZeroRetailPrices();
    log(`${nonZeroRetailPrices.length} need to be updated`);

    const promises = [];
    for (let i = 0; i < nonZeroRetailPrices.length; i++) {
      const product = nonZeroRetailPrices[i];
      const promise = updateProduct(product.id, { retail_price: 0 });
      promises.push(promise);
    }
    await Promise.all(promises);

    const secondCheck = await fetchNonZeroRetailPrices();

    if (secondCheck.length === 0) {
      log("all g my fren");
    } else {
      log(
        `${secondCheck.length} still need to be updated. Something went wrong`,
      );
    }
  } catch (err) {
    log(err);
  }
}

main();
