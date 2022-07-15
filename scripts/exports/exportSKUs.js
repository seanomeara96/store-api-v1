const { default: getStoreSKUs } = require("../../functions/products/getStoreSKUs");

const allSKUs = [];

const stores = ["bsk", "bf", "ah", "ih", "pb", "bs", "fs", "hie", "stie", "ds"];

async function main() {
  const skus = [];
  for (const store of stores) {
    require("../../config/config").config(store);
    const storeSKUs = await getStoreSKUs(250).catch(console.log);
    skus.push(...storeSKUs);
  }
  const uniqueSkus = [...new Set(skus)];

  const skuJSON = uniqueSkus.map((sku) => ({ sku }));
  const { output } = require("../utils/output");
  await output("allSKUs", skuJSON).catch(console.log);
}
main();
