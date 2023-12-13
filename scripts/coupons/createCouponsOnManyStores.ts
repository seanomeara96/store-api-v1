// create coupon on all stores
import { createCoupon } from "../../functions/coupons/createCoupon";

type DateObject = {
  dayAbbr: string;
  dd: string;
  monthAbbr: string;
  yyyy: string;
};

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
  name: string,
  code: string,
  type: string,
  amount: string,
  expires: DateObject,
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

(async function () {
  for (let store of stores) {
    require("../../config/config").config(store)
    await createCoupon(couponData);
  }
})();
