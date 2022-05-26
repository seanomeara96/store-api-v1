require("../../config/config").config("bf", 2);

const { getAllCoupons } = require("../../functions/coupons/getAllCoupons");
const { output } = require("../utils/output");

getAllCoupons()
  .then(async function (res) {
    const data = res.map((coupon) => {
      function dateFormatter(day) {
        if (day === "") {
          return day;
        }
        return `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;
      }

      const expiry =
        coupon.expires.length > 0 ? new Date(coupon.expires) : coupon.expires;
      const expires = dateFormatter(expiry);

      const created = new Date(coupon.date_created);
      const date_created = dateFormatter(created);

      return { ...coupon, expires, date_created };
    });
    await output(`bf-coupons`, data);
    console.log("done");
  })
  .catch(console.log);
