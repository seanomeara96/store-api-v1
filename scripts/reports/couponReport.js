require("../../config/config").config("bf", 2);
const { getAllOrders } = require("../../functions/orders/getAllOrders");
const { getOrderCoupon } = require("../../functions/orders/getOrderCoupon");
const { output } = require("../utils/output");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let monthsToTest = [
  { monthName: "January", month: 0, lastDay: 31, year: 2021 },
  { monthName: "February", month: 1, lastDay: 28, year: 2021 },
  { monthName: "March", month: 2, lastDay: 31, year: 2021 },
  { monthName: "April", month: 3, lastDay: 30, year: 2021 },
  { monthName: "May", month: 4, lastDay: 31, year: 2021 },
  { monthName: "June", month: 5, lastDay: 30, year: 2021 },
  { monthName: "July", month: 6, lastDay: 31, year: 2021 },
  { monthName: "August", month: 7, lastDay: 31, year: 2021 },
  { monthName: "September", month: 8, lastDay: 30, year: 2021 },
  { monthName: "October", month: 9, lastDay: 31, year: 2021 },
  { monthName: "November", month: 10, lastDay: 30, year: 2020 },
  { monthName: "December", month: 11, lastDay: 31, year: 2020 },
]; // month base 0
const period = monthsToTest[9]
const startDate = new Date(period.year, period.month, 1);
const endDate = new Date(period.year, period.month, period.lastDay);
getAllOrders({
  min_date_created: startDate.toISOString(),
  max_date_created: endDate.toISOString(),
})
  .then(async (orders) => {
    try {
      let promises = [];
      orders = orders.filter(
        ({ coupon_discount }) => parseFloat(coupon_discount) > 0
      );
      console.log("orders with discount", orders.length);
      orders.forEach((order) => {
        promises.push(getOrderCoupon(order.id, order.coupons.resource));
      });
      console.log("number of promises", promises.length);
      let res = await Promise.allSettled(promises);
      let rejected = res.filter(({ status }) => status === "rejected");
      rejected.forEach(({ reason }) => console.log(reason));
      console.log(
        `${rejected.length} promises rejected / ${res.length} total responses`
      );
      res = res.filter((i) => i.status === "fulfilled");
      res = res.map(({ value }) => value);
      console.log("number of responses", res.length);
      res.forEach(({ orderId, code }) => {
        orders.find((order) => order.id === orderId)["coupon_used"] = code;
      });
      let allCouponsUsed = [
        ...new Set(orders.map(({ coupon_used }) => coupon_used)),
      ];
      let totalRevenuePerCoupon = allCouponsUsed.map((coupon) => {
        return {
          coupon,
          revenue: orders
            .filter(({ coupon_used }) => coupon_used === coupon)
            .reduce((a, b) => {
              return a + parseFloat(b.subtotal_inc_tax);
            }, 0),
        };
      });
      const couponRank = totalRevenuePerCoupon.sort(
        (a, b) => b.revenue - a.revenue
      );
      const out = await output(`${period.monthName}-couponUsage`, couponRank);
      const attachment = Buffer.from(out).toString("base64");
      const msg = {
        to: "sean@beautyfeatures.ie",
        from: "sean@beautyfeatures.ie",
        subject: `Coupon Usage Stats for ${startDate.toDateString()} to ${endDate.toDateString()}`,
        text: `Coupon Usage Stats for ${startDate.toDateString()} to ${endDate.toDateString()}`,
        html: couponRank
          .map(
            ({ coupon, revenue }) =>
              `<p><strong>Coupon: </strong><span>${coupon}</span>\t<strong>Revenue: </strong><span>${revenue}</span></p>`
          )
          .join("\n"),
        attachments: [
          {
            content: attachment,
            filename: "couponUsage-output.csv",
            type: "text/csv",
            disposition: "attachment",
          },
        ],
      };
      sgMail.send(msg).catch((err) => console.log(err.response.body));
    } catch (err) {
      console.log(err);
    }
  })
  .catch(console.log);
