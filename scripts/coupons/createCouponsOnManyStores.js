// create coupon on all stores
const { createCoupon } = require("../../functions/coupons/createCoupon");
/**type discountTypes =
  | "per_item_discount"
  | "per_total_discount"
  | "shipping_discount"
  | "free_shipping"
  | "percentage_discount"
  | "promotion";
/**
 *
 * @param name
 * @param code
 * @param type
 * @param amount
 * @param expires
 * @param applies_to
 * @param enabled
 * @returns
 */
function createCouponData(
  name,
  code,
  type,
  amount,
  expires,
  applies_to = {
    entity: "categories",
    ids: [0],
  },
  enabled = true
) {
  const { dayAbbr, dd, monthAbbr, yyyy } = expires;
  return {
    name,
    code,
    type,
    amount,
    applies_to,
    expires: `${dayAbbr}, ${dd} ${monthAbbr} ${yyyy} 00:00:00 +0000`,
    enabled,
  };
}
const couponData = createCouponData(
  "May Thank You",
  "MAY10",
  "percentage_discount",
  "10",
  { dayAbbr: "Mon", dd: "06", monthAbbr: "Jun", yyyy: "2022" },
  {
    entity: "categories",
    ids: [0],
  }
);

const stores = ["ah", "bs", "pb"];

const promises = stores.map((store) => {
  require("../../config/config").config(store, 2);
  return createCoupon(couponData);
});

function logReasons(arr) {
  arr.forEach((res) => {
    if (res.status === "rejected") console.log(res.reason);
  });
}

Promise.allSettled(promises).then(logReasons);
