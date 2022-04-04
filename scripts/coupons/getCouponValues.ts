require("../../config/config").config("bf", 2);
const { getAllCoupons } = require("../../functions/coupons/getAllCoupons");
const { output } = require("../utils/output");

async function getCouponValues(coupons) {
  if (!coupons) throw new Error("coupons is undefined");
  const systemCoupons = await getAllCoupons();

  coupons.forEach((coupon) => {
    const matchingCoupon = systemCoupons.find((i) => {
      return i.code === coupon.couponDetails;
    });
    if (!matchingCoupon)
      console.log(
        `Could not find a coupon in the system that matched code ${coupon.couponDetails}`
      );
    if (matchingCoupon) {
      coupon.systemValue = matchingCoupon.amount;
    }
  });
  console.log(coupons);
  await output("coupon-values", coupons);
  console.log("done");
}

