(async () => {
  const { deleteProduct } = require("../../functions/products/deleteProduct");

  require("../../config/config").config("bf");

  const data = [{ "Product ID": 2976 }, { "Product ID": 3371 }];

  const { log } = console;

  for (const p of data) {
    const res = await deleteProduct(
      p.id || p["Product ID"] || p["bc_id"]
    ).catch(log);
    console.log(res + "\n");
    log("deleted");
  }
})();
