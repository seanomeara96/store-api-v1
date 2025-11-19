import { updateProduct } from "./functions/products/updateProduct";
import { getAllProducts } from "./functions/products/getAllProducts";

require("./config/config").config("bf");

async function testMain() {
  try {
    const products = await getAllProducts();
    console.log(products.length);
  } catch (err) {
    console.log(err);
  }
}
testMain();
