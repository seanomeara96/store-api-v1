require("./config/config").config("ss");
const { getAllProducts } = require("./functions/products/getAllProducts");
const { updateProduct } = require("./functions/products/updateProduct");

const { log } = console;

(async () => {
  const products = await getAllProducts().catch(log);

  for (const x of products) {
    await updateProduct(x.id, {
      description: x.description.replace(/450/g, "600"),
    }).catch(console.log);
    console.log(`updated product ${x.id}`);
  }
})();
