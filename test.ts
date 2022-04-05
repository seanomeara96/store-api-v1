const { updateSortOrder } = require("./functions/products/updateSortOrder");

async function manipulateSortOrderOfSpecificProducts() {
  const { getProductById } = require("./functions/products/getProductById");

  require("./config/config").config("bf");

  interface TempProductDetails {
    "Product ID": number;
    sort_order?: number;
    updated_sort_order?: number;
  }

  const products: TempProductDetails[] = [
    { "Product ID": 4178 },
    { "Product ID": 4216 },
    { "Product ID": 4333 },
    { "Product ID": 4433 },
    { "Product ID": 4435 },
    { "Product ID": 4507 },
    { "Product ID": 4508 },
    { "Product ID": 4509 },
    { "Product ID": 4510 },
    { "Product ID": 4513 },
    { "Product ID": 4514 },
    { "Product ID": 4515 },
    { "Product ID": 4516 },
    { "Product ID": 4517 },
    { "Product ID": 4743 },
    { "Product ID": 4745 },
    { "Product ID": 5044 },
    { "Product ID": 5045 },
    { "Product ID": 5046 },
    { "Product ID": 5047 },
    { "Product ID": 5048 },
    { "Product ID": 5049 },
    { "Product ID": 5050 },
    { "Product ID": 5051 },
    { "Product ID": 5052 },
    { "Product ID": 5053 },
    { "Product ID": 5054 },
    { "Product ID": 5055 },
    { "Product ID": 5056 },
    { "Product ID": 5057 },
    { "Product ID": 5058 },
    { "Product ID": 5059 },
    { "Product ID": 5060 },
    { "Product ID": 5061 },
    { "Product ID": 5062 },
    { "Product ID": 5063 },
    { "Product ID": 5064 },
    { "Product ID": 5065 },
    { "Product ID": 5066 },
    { "Product ID": 5067 },
    { "Product ID": 5068 },
    { "Product ID": 5069 },
    { "Product ID": 5070 },
    { "Product ID": 5071 },
    { "Product ID": 5072 },
    { "Product ID": 5073 },
    { "Product ID": 5074 },
    { "Product ID": 5075 },
    { "Product ID": 5076 },
    { "Product ID": 5077 },
    { "Product ID": 5078 },
    { "Product ID": 5079 },
    { "Product ID": 5080 },
    { "Product ID": 5377 },
    { "Product ID": 5378 },
    { "Product ID": 5379 },
    { "Product ID": 5380 },
    { "Product ID": 5381 },
    { "Product ID": 5382 },
    { "Product ID": 5383 },
    { "Product ID": 5384 },
    { "Product ID": 5385 },
    { "Product ID": 5386 },
    { "Product ID": 5387 },
    { "Product ID": 5388 },
    { "Product ID": 5389 },
    { "Product ID": 5390 },
    { "Product ID": 5391 },
    { "Product ID": 5392 },
    { "Product ID": 5446 },
    { "Product ID": 5447 },
    { "Product ID": 5448 },
    { "Product ID": 5449 },
    { "Product ID": 5450 },
    { "Product ID": 5451 },
    { "Product ID": 5452 },
    { "Product ID": 5453 },
    { "Product ID": 5454 },
    { "Product ID": 5455 },
    { "Product ID": 5456 },
    { "Product ID": 5457 },
    { "Product ID": 5458 },
    { "Product ID": 5459 },
    { "Product ID": 5460 },
    { "Product ID": 5461 },
    { "Product ID": 5462 },
    { "Product ID": 5463 },
    { "Product ID": 5464 },
    { "Product ID": 5466 },
    { "Product ID": 5467 },
    { "Product ID": 5468 },
    { "Product ID": 5469 },
    { "Product ID": 5470 },
    { "Product ID": 5471 },
    { "Product ID": 5472 },
    { "Product ID": 5473 },
    { "Product ID": 5474 },
    { "Product ID": 5475 },
    { "Product ID": 5476 },
    { "Product ID": 5477 },
    { "Product ID": 5478 },
    { "Product ID": 5479 },
    { "Product ID": 5480 },
    { "Product ID": 5481 },
    { "Product ID": 5482 },
    { "Product ID": 5483 },
    { "Product ID": 5484 },
    { "Product ID": 5485 },
    { "Product ID": 5486 },
    { "Product ID": 5641 },
    { "Product ID": 5694 },
    { "Product ID": 5713 },
    { "Product ID": 5714 },
    { "Product ID": 5719 },
  ];

  await Promise.allSettled(
    products.map((product) =>
      getProductById(product["Product ID"]).then(
        (res: any) => (product.sort_order = res.sort_order)
      )
    )
  );

  products.forEach(
    (product) => (product.updated_sort_order = product.sort_order * 10)
  );

  const promises = products.map((product) =>
    updateSortOrder(product["Product ID"], product.updated_sort_order)
  );

  const res = await Promise.allSettled(promises);

  console.log(
    res.filter(({ status }) => status === "fulfilled").length / res.length
  );
}
manipulateSortOrderOfSpecificProducts();
