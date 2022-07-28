const { default: getStoreSKUs } = require("../../functions/products/getStoreSKUs");
const { output } = require("../utils/output");

const stores = ["bf"];

(async () => {
  const skus = [];
  for (const store of stores) {
    require("../../config/config").config(store);
    const storeSKUs = await getStoreSKUs(250).catch(console.log);
    skus.push(...storeSKUs);
  }
  const uniqueSkus = [...new Set(skus)];

  const skuJSON = uniqueSkus.map((sku) => ({ sku }));
  
  await output("allSKUs", skuJSON).catch(console.log);
})();
