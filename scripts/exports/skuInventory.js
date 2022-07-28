const {
  default: getStoreSKUs,
} = require("../../functions/products/getStoreSKUs");
const {output} = require("../utils/output")
const delistedSkus = require("./delist");


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

(async () => {
  for (const store of stores) {
    require("../../config/config").config(store);
    const liveSkus = await getStoreSKUs(250, true);

    const delistedSkusArr = liveSkus.filter(lvar => delistedSkus.includes(lvar.sku));

    const inStockDelistedSkus = delistedSkusArr.filter(i => i.inventory_level)

    console.log(delistedSkusArr.map(({sku}) => sku))

    const nonDelistedSkus = liveSkus.filter(lvar => !delistedSkus.includes(lvar.sku));

    const inStockNonDelistedSkus = nonDelistedSkus.filter(sku => sku.inventory_level);

    const data = {
      store,
      products: liveSkus.length,
      in_stock: inStockNonDelistedSkus.length,
      oos: liveSkus.length - inStockNonDelistedSkus.length,
      disabled: delistedSkusArr.length,
      disabled_in_stock: inStockDelistedSkus.length,
      disabled_oos: delistedSkusArr.length - inStockDelistedSkus.length
    }

    report.push(data);
  }
  await output("products-disabled", report)
})();
