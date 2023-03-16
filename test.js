const { updateProduct } = require("./functions/products/updateProduct");
const { getAllProducts } = require("./functions/products/getAllProducts");
(async () => {
  require("./config/config").config("ha");
  const products = await getAllProducts()
  if (!products){
     console.log("no products")
     return
  }
  console.log(`found ${products.length} products`);

  for (const { id } of products) {
    console.log(`updating inventory tracking of product ${id}`);
    try {
      const res = await updateProduct(id, {
        inventory_tracking: "none",
      });
      console.log(id, res.inventory_tracking);
    } catch (err) {
      console.log(err);
      continue;
    }
  }
})();
