(async () => {
  const { deleteProduct } = require("../../functions/products/deleteProduct");

  require("../../config/config").config("bf");

  const data = [
    { bc_id: 4315 },
    { bc_id: 4316 },
    { bc_id: 4364 },
    { bc_id: 4365 },
    { bc_id: 4366 },
    { bc_id: 4367 },
    { bc_id: 4368 },
    { bc_id: 4369 },
    { bc_id: 4370 },
    { bc_id: 4371 },
    { bc_id: 4372 },
    { bc_id: 4373 },
    { bc_id: 4374 },
    { bc_id: 4375 },
    { bc_id: 4376 },
    { bc_id: 4377 },
    { bc_id: 4378 },
    { bc_id: 4379 },
    { bc_id: 4380 },
    { bc_id: 4381 },
    { bc_id: 4382 },
    { bc_id: 4383 },
    { bc_id: 4384 },
    { bc_id: 4385 },
    { bc_id: 4386 },
    { bc_id: 4387 },
    { bc_id: 4388 },
    { bc_id: 4389 },
    { bc_id: 4390 },
    { bc_id: 4391 },
    { bc_id: 4392 },
    { bc_id: 4393 },
    { bc_id: 4394 },
    { bc_id: 4395 },
    { bc_id: 4396 },
    { bc_id: 4397 },
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
