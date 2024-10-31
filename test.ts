import { getProductBySku } from "./functions/products/getProductBySKU";
import { updateProduct } from "./functions/products/updateProduct";
import {getAllProducts} from "./functions/products/getAllProducts"


async function main() {
  try {
    require("./config/config").config("pl");
    for (const product of await getAllProducts()){
        await updateProduct(product.id, {
          inventory_level: 0,
        })
        await new Promise(res => setTimeout(res, 1000))
      } 
  } catch (err) {
    console.log(err);
  }
}

main();
