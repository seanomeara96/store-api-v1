require("../../config/config").config("bf", 2);
const { getAllOrders } = require("../../functions/orders/getAllOrders");
const { getOrderCoupon } = require("../../functions/orders/getOrderCoupon");
const { ouput } = require("../utils/output");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const fs = require("fs");
const startDate = new Date(2021, 8, 1);
const endDate = new Date(2021, 8, 30);
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
      res = res.map(({ value }) => value);
      console.log("number of responses", res.length);
      console.log(res);
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
      await ouput("couponUsage", couponRank);
      const pathToAttachment = `${__dirname}/couponUsage-output.csv`;
      const attachment = fs.readFileSync(pathToAttachment).toString("base64");
      const msg = {
        to: "sean@beautyfeatures.ie",
        from: "sean@beautyfeatures.ie",
        subject: `Coupon Usage Stats for ${startDate.toDateString()} to ${endDate.toDateString()}`,
        text: "",
        html: couponRank.map(
          ({ coupon, revenue }) =>
            `<p><strong>Coupon: </strong><span>${coupon}</span><strong>Revenue: </strong><span>${revenue}</span></p>`
        ),
        attachments: [
          {
            content: attachment,
            filename: "couponUsage-output.csv",
            type: "text/csv",
            disposition: "attachment",
          },
        ],
      };
      await sgMail.send(msg);
    } catch (err) {
      console.log(err);
    }
  })
  .catch(console.log);
