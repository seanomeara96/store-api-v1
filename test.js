const store = "ah";
require("./config/config").config(store);
const { output } = require("./scripts/utils/output");
const { getFilters } = require("./functions/filters/getFilters");
const { getAllProducts } = require("./functions/products/getAllProducts");
async function main() {
  const products = await getAllProducts().catch(console.log);
  const productFilterRequests = products.map(({ id }) => getFilters(id));
  const responses = await Promise.allSettled(productFilterRequests).catch(
    console.log
  );
  const responseValues = responses.map(({ value }) => value);
  console.log(responseValues);
  const allFilterNames = responseValues
    .map(({ filters }) => filters.map(({ name }) => name))
    .flat();
  const uniqueFilterNames = [...new Set(allFilterNames)];
  console.log(uniqueFilterNames);
  const filterDocs = responseValues.map((product) => {
    const doc = {
      "Product ID": product.product_id,
    };
    uniqueFilterNames.forEach((name) => (doc[name] = []));
    product.filters.forEach((filter) => doc[filter.name].push(filter.value));
    for (let key in doc) {
      if (Array.isArray(doc[key])) doc[key] = doc[key].sort().join(", ")
    }
    return doc;
  });
  console.log(filterDocs);
  await output(`${store}-product-filters`, filterDocs).catch(console.log);
}
main();
