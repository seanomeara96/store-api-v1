import { htmlToText } from "html-to-text";
import { Category } from "./functions/categories/createCategory";
import { getAllCategories } from "./functions/categories/getAllCategories";
import { getAllProducts } from "./functions/products/getAllProducts";
import { output } from "./scripts/utils/output";
import fs from "fs"
import path from "path"
import { getProductVariants } from "./functions/products/getProductVariants";


const store = "ah"

async function main() {
  try {
    require("./config/config").config(store);
   
    let products = await getAllProducts()
    products = products.filter(p => p.inventory_level)


    let out = []

    for(const product of products){
      const variants = await getProductVariants(product.id)
      for(const variant of variants){
        out.push({
          sku: variant.sku,
          name: product.name,
          description: htmlToText(product.description),
          sale_price: product.sale_price,
        })
      }
    }

    
    output(path.resolve(__dirname, "ah-bare-catalog.csv"), out,true)
  } catch (err) {
    console.log(err);
  }
}

main();

