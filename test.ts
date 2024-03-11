import { getAllProducts } from "./functions/products/getAllProducts";
import { getProductVariants } from "./functions/products/getProductVariants";
import path from "path"
import { output } from "./scripts/utils/output";
async function test() {
  try {
    require("./config/config").config("ch");
    const products = await getAllProducts();
    const data = [];
    for (const product of products) {
      const vars = await getProductVariants(product.id);
      if (vars.length === 1) continue 
      for (const v of vars) {
        console.log("v.price", v.price, "v.sale_price", v.sale_price, "v.retail_price", v.retail_price, "v.map_price", v.map_price)
        if (!v.sale_price || !v.price) {
          data.push({ sku: v.sku, product_id: product.id });
        }
      }
    }
    output(path.resolve(__dirname, "no-price-variants.csv"), data, true)
  } catch (err) {
    console.log(err);
  }
}

test();
