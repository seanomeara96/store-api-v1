import { getAllProducts } from "./functions/products/getAllProducts";
import { getAllProductVariants } from "./functions/products/getAllProductVariants";
import { getProductBySku } from "./functions/products/getProductBySKU";
import { updateProduct } from "./functions/products/updateProduct";

async function test2() {
  try {
    require("./config/config").config("pb");
    const seenProducts: number[] = [];
    const productVariants = await getAllProductVariants();
    for (let i = 0; i < productVariants.length; i++) {
      console.log(i, productVariants.length);
      const pv = productVariants[i];
      require("./config/config").config("ih");
      const product = await getProductBySku(pv.sku);
      if (!product) {
        console.log(`no product on inhealth for sku ${pv.sku}`);
        continue;
      }
      
    }
  } catch (error) {
    console.log(error);
  }
}
test2();
