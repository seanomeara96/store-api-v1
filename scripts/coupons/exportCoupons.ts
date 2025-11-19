require("../../config/config").config("bf", 2);
import { getAllCoupons } from "../../functions/coupons/getAllCoupons";
import { output } from "../utils/output";

getAllCoupons()
  .then(async function (res) {
    const data = res.map((coupon) => {
      function dateFormatter(day: Date | string): string | Date {
        if (day === "" || typeof day === "string") {
          return day;
        }
        return `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;
      }

      const expiry =
        typeof coupon.expires === "string" && coupon.expires.length > 0
          ? new Date(coupon.expires)
          : coupon.expires;
      const expires = dateFormatter(expiry);

      const created = new Date(coupon.date_created);
      const date_created = dateFormatter(created);

      return { ...coupon, expires, date_created };
    });
    await output(`bf-coupons`, data, true);
    console.log("done");
  })
  .catch(console.log);
