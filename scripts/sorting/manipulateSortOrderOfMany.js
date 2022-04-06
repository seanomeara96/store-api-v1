const { updateSortOrder } = require("./functions/products/updateSortOrder");

async function manipulateSortOrderOfSpecificProducts() {
  const { getProductById } = require("../../functions/products/getProductById");

  require("./config/config").config("bf");


  

  await Promise.allSettled(
    products.map((product) =>
      getProductById(product["Product ID"]).then(
        (res) => (product.sort_order = res.sort_order)
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
