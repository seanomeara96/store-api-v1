require("../config/config").config("bf");
const { getAllProducts } = require("../products/getAllProducts");
const { getFiltersOfMany } = require("./getFiltersOfMany");
const { updateFilter } = require("./updateFilter");
const newFilterName = "Product Type";
const filtersToBeConsolidated = ["Paraben Free", "Sulphate Free", "Vegan"]
function consolidateFilters() {
  return new Promise(async (resolve, reject)=>{
    try {
        const products = await getAllProducts();
        const productIds = products.map(({ id }) => {
          return { id };
        });
        const allProductFilters = await getFiltersOfMany(productIds);
        let promises = []
        allProductFilters.forEach((product) => {
          product.filters.forEach(({id, value}) => {
            if (filtersToBeConsolidated.includes(value)) {
              promises.push(
                updateFilter(product.product_id, id, newFilterName, value)
              );
            }
          });
        });
        Promise.allSettled(promises).then(resolve).catch(reject)
      } catch (err) {
        console.log(err);
      }
  })
}

consolidateFilters().then(console.log).catch(console.log)

