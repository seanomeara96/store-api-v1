import { htmlToText } from "html-to-text";
import { Category } from "./functions/categories/createCategory";
import { getAllCategories } from "./functions/categories/getAllCategories";
import { getAllProducts } from "./functions/products/getAllProducts";
import { output } from "./scripts/utils/output";
import fs from "fs"
import path from "path"


const store = "bf"

async function main() {
  try {
    require("./config/config").config(store);
   
    let products = await getAllProducts()
    products = products.filter(p => p.inventory_level)
    let out = products.map(p => ({
      id: p.id,
      name: p.name,
      description: htmlToText(p.description),
      sale_price: p.sale_price,
    }))
    output(path.resolve(__dirname, "bare-catalog.csv"), out,true)
  } catch (err) {
    console.log(err);
  }
}

main();

