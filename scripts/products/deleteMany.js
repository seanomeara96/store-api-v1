(async () => {
  const { deleteProduct } = require("../../functions/products/deleteProduct");

  require("../../config/config").config("pb");

  const data = [{ id: 1322 }, { id: 1323 }];

  const { log } = console;

  for (const p of data) {
    const res = await deleteProduct(p.id).catch(log);
    console.log(res + "\n");
    log("deleted");
  }
})();
