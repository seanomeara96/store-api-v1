require("./config/config").config("ih",2);
// 138

const {getCoupon} = require("./functions/coupons/getCoupon")

getCoupon(138).then(console.log).catch(console.log)