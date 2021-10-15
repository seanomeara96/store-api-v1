const api = require("../../config/config");
const {
  applyManyFilters,
} = require("../../functions/filters/applyManyFilters");
const { getFilters } = require("../../functions/filters/getFilters");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const fromStore = "bf";
const toStore = "ah";
async function transferFilters() {
  try {
    // get bf products
    api.config(fromStore);
    const bfProducts = await getAllProducts();
    const promises = [];
    bfProducts.forEach(({ id }) => promises.push(getFilters(id)));
    const responses = await Promise.allSettled(promises);
    const bfFilters = responses
      .filter((response) => response.value)
      .map((response) => response.value);
    const bfSkuFilters = bfFilters.map((filter) => {
      return {
        filters: filter.filters,
        sku: bfProducts.find((i) => i.id === filter.product_id).sku,
      };
    });
    //console.log(bfSkuFilters);
    api.config(toStore);
    const ahProducts = await getAllProducts();
    //console.log(ahProducts)
    const ahFiltersToUpload = bfSkuFilters
      .map((filter) => {
        const matching = ahProducts.find((i) => i.sku === filter.sku);
        if (matching) {
          return {
            ...filter,
            id: matching.id,
          };
        }
      })
      .filter((i) => i);
    const uploadPromises = [];
    ahFiltersToUpload.forEach(({ id, filters }) =>
      uploadPromises.push(applyManyFilters(id, filters))
    );
    const uploadResponses = await Promise.allSettled(uploadPromises);
    console.log(uploadResponses);
  } catch (err) {
    console.log(err);
  }
}
transferFilters();
