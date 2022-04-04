// create coupon on all stores
const { createCoupon } = require("./functions/coupons/createCoupon");
type discountTypes =
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
  name: string,
  code: string,
  type: discountTypes,
  amount: string,
  expires: { dayAbbr: string; dd: string; monthAbbr: string; yyyy: string },
  applies_to: { entity: string; ids: number[] } = {
    entity: "categories",
    ids: [0],
  },
  enabled: boolean = true
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
  "AUTOMATION TEST",
  "SEANTEST",
  "percentage_discount",
  "10",
  { dayAbbr: "Tue", dd: "05", monthAbbr: "Apr", yyyy: "2022" }
);

const stores = ["bf", "bsk", "ah", "ih", "bs", "pb"];

const promises = stores.map((store) => {
  require("./config/config").config(store, 2);
  return createCoupon(couponData);
});

Promise.allSettled(promises).then(console.log);
