import { htmlToText } from "html-to-text";

import { getAllProducts } from "./functions/products/getAllProducts";
import { output } from "./scripts/utils/output";

import path from "path"
import { getProductVariants } from "./functions/products/getProductVariants";


const store = "bf"

async function main() {
  try {
    require("./config/config").config(store);
   
    let products = await getAllProducts()

    products = products.filter(p => p.inventory_level)

    let out = [];

    for(const product of products){
      const variants = await getProductVariants(product.id)
      for(const variant of variants){
        out.push({
          sku: variant.sku,
          name: product.name,
          description: htmlToText(product.description),
          retail_price: product.price,
          sale_price: product.sale_price,
          saving: String(Math.round(((product.price - product.sale_price) / product.price) * 100)) + "%"
        })
      }
    }

    
    output(path.resolve(__dirname, `${store}-bare-catalog.csv`), out,true)
  } catch (err) {
    console.log(err);
  }
}

main();

