const {
  default: getStoreSKUs,
} = require("../../functions/products/getStoreSKUs");

const stores = [
  "bf",
  "ih",
  "bsk",
  "ah",
  "pb",
  "bs",
  "hie",
  "huk",
  "beuk",
  "stie",
  "ds",
];

(async () => {
  for (const store of stores) {
    require("../../config/config").config(store);
    const vars = await getStoreSKUs(500);

    console.log(
      `${store} -> ${vars.filter((v) => v.inventory_level).length}/${
        vars.length
      }`
    );
  }
})();
