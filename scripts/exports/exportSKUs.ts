import { getStoreSKUs } from "../../functions/products/getStoreSKUs";
import { output } from "../utils/output";

const stores = ["bf"];

async function fetchSKUs() {
  const skus = [];
  for (const store of stores) {
    require("../../config/config").config(store);
    const storeSKUs = await getStoreSKUs(250);
    skus.push(...storeSKUs);
  }
  const uniqueSkus = [...new Set(skus)];

  const skuJSON = uniqueSkus.map(function (sku) {
    return { sku: sku };
  });

  await output("allSKUs", skuJSON, true);
}

fetchSKUs();
