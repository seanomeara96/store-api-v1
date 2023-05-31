import { getAllProducts } from "./functions/products/getAllProducts";
import { updateProduct } from "./functions/products/updateProduct";
require("./config/config").config("ha");

async function main() {
  const products = await getAllProducts();



  console.log(products[500])


}

main();
