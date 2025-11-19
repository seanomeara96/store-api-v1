
import { updateProduct } from "./functions/products/updateProduct"
import { getAllProducts } from "./functions/products/getAllProducts";

require("./config/config").config("kbsk");

async function testMain() {
  try {
    const products = await getAllProducts()
    for (const p of products){
      await updateProduct(p.id, {inventory_warning_level: 4})
    }
  } catch (err) {
    console.log(err);
  }
}
testMain();
