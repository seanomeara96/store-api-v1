const { createCoupon } = require("./functions/coupons/createCoupon");

// create coupon on all stores

/**
 *
 * @param {string} name
 * @param {string} code
 * @param {string} type per_item_discount| per_total_discount | shipping_discount | free_shipping | percentage_discount | promotion
 * @param {string} amount
 * @param {object} applies_to
 * @param {{ dayAbbr, dd, monthAbbr, yyyy }} expires
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
    enabled
  };
}
const couponData = createCouponData(
  "AUTOMATION TEST",
  "SEANTEST",
  "percentage_discount",
  "10",
  { dayAbbr: "Tue", dd: "05", monthAbbr: "Apr", yyyy: "2022" }
);

const stores = ["bf","bsk", "ah", "ih", "bs", "pb"];

const promises = stores.map((store) => {
  require("./config/config").config(store, 2);
  return createCoupon(couponData)
});

Promise.allSettled(promises).then(console.log)
