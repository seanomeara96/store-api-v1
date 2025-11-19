import { getStoreSKUs } from "../../functions/products/getStoreSKUs";
import { output } from "../utils/output";

const delistJson = [{ "DELIST FILE": "4004" }];

// Extract unique delisted SKU numbers
const delistedSkus = [
  ...new Set(delistJson.map((obj) => Object.values(obj)[0])),
];

// List of stores to check
const stores = [
  "bf",
  "ih",
  "bsk",
  "ah",
  "pb",
  "bs",
  "hie",
  "huk",
  "fs",
  "beuk",
  "stie",
  "ds",
];

const report = [];

(async function () {
  for (const store of stores) {
    require("../../config/config").config(store);
    const liveSkus = await getStoreSKUs(250, true);

    // Filter live SKUs to find delisted ones
    const delistedSkusArr = liveSkus.filter((lvar) =>
      delistedSkus.includes(lvar.sku),
    );

    // Find delisted SKUs that are in stock
    const inStockDelistedSkus = delistedSkusArr.filter(
      (lvar) => lvar.inventory_level,
    );

    console.log(delistedSkusArr.map((d) => d.sku));

    // Filter to find SKUs that are not delisted
    const nonDelistedSkus = liveSkus.filter(
      (lvar) => !delistedSkus.includes(lvar.sku),
    );

    // Find non-delisted SKUs that are in stock
    const inStockNonDelistedSkus = nonDelistedSkus.filter(
      (sku) => sku.inventory_level,
    );

    // Create data summary for the report
    const data = {
      store,
      products: liveSkus.length,
      in_stock: inStockNonDelistedSkus.length,
      oos: liveSkus.length - inStockNonDelistedSkus.length,
      disabled: delistedSkusArr.length,
      disabled_in_stock: inStockDelistedSkus.length,
      disabled_oos: delistedSkusArr.length - inStockDelistedSkus.length,
    };

    report.push(data);
  }
  await output("products-disabled", report, true);
})();
