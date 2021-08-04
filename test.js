const { getAllProducts } = require("./products/getAllProducts");
require("./config/config").config("bf")
async function main() {
  let products = await getAllProducts();
  products = products.sort((a, b) => a.reviews_count - b.reviews_count);
  console.log(products[0])
}
main();
