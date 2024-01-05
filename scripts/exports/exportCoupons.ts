import { getAllCoupons } from "../../functions/coupons/getAllCoupons"
import { output } from "../utils/output"

require("../../config/config").config("bf", 2);

async function exportCoupons() {
  const coupons = await getAllCoupons().catch((err) => {
    throw err
  });

  await output("bf-coupons", coupons, true)
}
exportCoupons()