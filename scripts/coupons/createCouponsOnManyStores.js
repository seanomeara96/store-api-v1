// create coupon on all stores
var createCoupon = require("./functions/coupons/createCoupon").createCoupon;
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
function createCouponData(name, code, type, amount, expires, applies_to, enabled) {
    if (applies_to === void 0) { applies_to = {
        entity: "categories",
        ids: [0]
    }; }
    if (enabled === void 0) { enabled = true; }
    var dayAbbr = expires.dayAbbr, dd = expires.dd, monthAbbr = expires.monthAbbr, yyyy = expires.yyyy;
    return {
        name: name,
        code: code,
        type: type,
        amount: amount,
        applies_to: applies_to,
        expires: "".concat(dayAbbr, ", ").concat(dd, " ").concat(monthAbbr, " ").concat(yyyy, " 00:00:00 +0000"),
        enabled: enabled
    };
}
var couponData = createCouponData("AUTOMATION TEST", "SEANTEST", "percentage_discount", "10", { dayAbbr: "Tue", dd: "05", monthAbbr: "Apr", yyyy: "2022" });
var stores = ["bf", "bsk", "ah", "ih", "bs", "pb"];
var promises = stores.map(function (store) {
    require("./config/config").config(store, 2);
    return createCoupon(couponData);
});
Promise.allSettled(promises).then(console.log);
