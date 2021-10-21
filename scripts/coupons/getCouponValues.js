require("../../config/config").config("bf", 2);
const { getAllCoupons } = require("../../functions/coupons/getAllCoupons");
const { output } = require("../utils/output");

async function getCouponValues(coupons) {
  const systemCoupons = await getAllCoupons();
  if (!coupons) throw new Error("coupons is undefined");
  coupons.forEach((coupon) => {
    const matchingCoupon = systemCoupons.find((i) => {
      return i.code === coupon.couponDetails;
    });

    if (matchingCoupon) {
      coupon.systemValue = matchingCoupon.amount;
    }
  });
  console.log(coupons);
  await output("coupon-values", coupons);
  console.log("done");
}
getCouponValues();
