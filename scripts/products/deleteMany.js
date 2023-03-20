(async () => {
  const { deleteProduct } = require("../../functions/products/deleteProduct");

  require("../../config/config").config("pb");

  const data = [
    { bc_id: 1234 },
    { bc_id: 1374 },
    { bc_id: 1439 },
    { bc_id: 1458 },
  ];

  const { log } = console;

  for (const p of data) {
    const res = await deleteProduct(
      p.id || p["Product ID"] || p["bc_id"]
    ).catch(log);
    console.log(res + "\n");
    log("deleted");
  }
})();
