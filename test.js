const { getFilters } = require("./functions/filters/getFilters");
const { updateFilter } = require("./functions/filters/updateFilter");
const { getAllProducts } = require("./functions/products/getAllProducts");
require("./config/config").config("bf");
(async function () {
  const products = await getAllProducts();
  for (const product of products) {
    const prf = await getFilters(product.id);
    console.log(prf)
    for (const filter of prf.filters) {
      if (filter.name === "Hair Concerns") {
        const fixedFilterValue = filter.value.trim();
        if (filter.value !== fixedFilterValue) {
          console.log(
            `updating filters for ${product.id} changing "${filter.value}" to "${fixedFilterValue}"`
          );
          await updateFilter(product.id, filter.id, filter.name, fixedFilterValue);
        }
      }
    }
  }
})();
