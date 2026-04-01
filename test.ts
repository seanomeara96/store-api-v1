import { getAllProducts } from "./functions/products/getAllProducts";

async function test() {
  try {
    for (const store of ["bf", "ih", "pb", "bsk", "bs", "ah"]) {
      require("./config/config").config(store);
      const products = await getAllProducts();
      for (const product of products) {
        if (product.inventory_tracking === "none" && product.inventory_level)
          console.log(
            store,
            product.sku,
            product.name,
            product.inventory_level,
          );
      }
    }
  } catch (err) {
    console.log(err);
  }
}
test();
