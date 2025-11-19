import { getAllCoupons } from "../../functions/coupons/getAllCoupons";
import { output } from "../utils/output";

require("../../config/config").config("bf", 2);

interface Coupon {
  couponDetails: string;
  systemValue?: number;
}

interface SystemCoupon {
  code: string;
  amount: number;
}

async function getCouponValues(coupons: Coupon[]): Promise<void> {
  if (!coupons) throw new Error("coupons is undefined");
  const systemCoupons: SystemCoupon[] = await getAllCoupons();

  // Create a map for quick lookup of system coupon amounts
  const systemCouponMap = new Map(systemCoupons.map((c) => [c.code, c.amount]));

  // Using a traditional for loop as it is generally considered faster than forEach in some cases
  for (let i = 0; i < coupons.length; i++) {
    const coupon = coupons[i];
    const matchingAmount = systemCouponMap.get(coupon.couponDetails);

    if (matchingAmount !== undefined) {
      coupon.systemValue = matchingAmount;
    } else {
      console.log(
        `Could not find a coupon in the system that matched code ${coupon.couponDetails}`,
      );
    }
  }

  console.log(coupons);
  await output("coupon-values", coupons, true);
  console.log("done");
}
