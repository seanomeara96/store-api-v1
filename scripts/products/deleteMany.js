(async () => {
  const { deleteProduct } = require("../../functions/products/deleteProduct");

  require("../../config/config").config("ih");

  const data = [{"Product ID":2807},
  {"Product ID":4218}];

  const { log } = console;

  for (const p of data) {
    const res = await deleteProduct(p.id || p["Product ID"]).catch(log);
    console.log(res + "\n");
    log("deleted");
  }
})();
