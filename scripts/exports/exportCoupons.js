const { getAllCoupons } = require("../../functions/coupons/getAllCoupons");
const { output } = require("../utils/output");

require("../../config/config").config("bf", 2);

async function exportCoupons() {
  const coupons = await getAllCoupons().catch((err) => {
    throw new Error(err);
  });

  await output("bf-coupons", coupons)
}
exportCoupons()