import { getAllProductVariantOptions } from "./functions/product-variant-options/getAllProductVariantOptions";
import { getProductById } from "./functions/products/getProductById";
import { getProductVariants } from "./functions/products/getProductVariants";
require("./config/config").config("bf");

async function main() {
  try {
    const product = await getProductById(5754)
    console.log(product.name)
    const variants = await getProductVariants(product.id);
    console.log(variants.map(v => v.option_values))
    const options = await getAllProductVariantOptions(product.id);
    console.log(`############`)
    console.log(options[0])
    console.log(options[0].option_values)
  } catch (err) {
    console.log(err);
  }
}

main();
