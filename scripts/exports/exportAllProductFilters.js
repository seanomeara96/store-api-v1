const store = "bf";
require("../../config/config").config(store);
const { output } = require("../utils/output");
const { getFilters } = require("../../functions/filters/getFilters");
const { getAllProducts } = require("../../functions/products/getAllProducts");
async function main() {
  const products = await getAllProducts().catch(console.log);

  if(!products){
    return
  }

  const productFilterRequests = products.map((product) =>
    getFilters(product.id).then(
      (res) => console.log(res)
    )
  );

  await Promise.allSettled(productFilterRequests);

  const essentialDetails = products.map((product) => {
    return {
      id: product.id,
      sku: product.sku,
      name: product.name,
      brand: product.brand,
      filters: product.filters.filters,
    };
  });

  console.log(essentialDetails);

  //await output(`${store}-product-filters`, filterDocs).catch(console.log);
}
main();
