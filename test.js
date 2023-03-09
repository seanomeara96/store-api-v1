const { getAllProducts } = require("./functions/products/getAllProducts");
const { output } = require("./scripts/utils/output");
async function main() {
  const issues = [];
  for (const store of ["ch", "ha"]) {
    require("./config/config").config(store);
    const products = await getAllProducts();
    for (const product of products) {
      product.store = store;
      if (product.inventory_tracking !== "none") {
        issues.push(product);
      }
    }
  }
  await output("tracking", issues)
}
main();
