import { getAllCoupons } from "../../functions/coupons/getAllCoupons";
import { output } from "../utils/output";

require("../../config/config").config("bf", 2);

async function exportCoupons() {
  try {
    const coupons = await getAllCoupons();
    await output("bf-coupons", coupons, true);
  } catch (err) {
    throw err;
  }
}
exportCoupons();
