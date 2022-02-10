require("../../config/config").config("bf", 2);
const { getAllOrders } = require("../../functions/orders/getAllOrders");
const { getOrderCoupon } = require("../../functions/orders/getOrderCoupon");
const { output } = require("../utils/output");
const sgMail = require("@sendgrid/mail");
const descendingRevenue = (a, b) => b.revenue - a.revenue;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let monthsToTest = [
  { monthName: "January", month: 0, lastDay: 31, year: 2022 },
  { monthName: "February", month: 1, lastDay: 28, year: 2022 },
  { monthName: "March", month: 2, lastDay: 31, year: 2022 },
  { monthName: "April", month: 3, lastDay: 30, year: 2022 },
  { monthName: "May", month: 4, lastDay: 31, year: 2022 },
  { monthName: "June", month: 5, lastDay: 30, year: 2022 },
  { monthName: "July", month: 6, lastDay: 31, year: 2022 },
  { monthName: "August", month: 7, lastDay: 31, year: 2022 },
  { monthName: "September", month: 8, lastDay: 30, year: 2022 },
  { monthName: "October", month: 9, lastDay: 31, year: 2022 },
  { monthName: "November", month: 10, lastDay: 30, year: 2022 },
  { monthName: "December", month: 11, lastDay: 31, year: 2021 },
]; // month base 0
const period = monthsToTest[11];
const startDate = new Date(period.year, period.month, 1);
const endDate = new Date(period.year, period.month, period.lastDay);

const ordersWithDiscount = (orders) =>
  orders.filter(({ coupon_discount }) => parseFloat(coupon_discount) > 0);
const rejectedResponses = (res) =>
  res.filter(({ status }) => status === "rejected");
const orderCouponPromise = (order) =>
  getOrderCoupon(order.id, order.coupons.resource);
const reason = ({ reason }) => reason;

const writeRejectionReasons = async (data) =>
  new Promise((res, rej) =>
    output("rejection-reasons", data).then(res).catch(rej)
  );
const fulfilledStatus = ({ status }) => status === "fulfilled";
const responseValue = ({ value }) => value;

const getFulfilledResponses = (res) => res.filter(fulfilledStatus);

const fetchDiscountedOrderCoupons = (discountedOrders) => {
  return new Promise(async (resolve, reject) => {
    console.log(
      `There are ${discountedOrders.length} orders with a discount applied`
    );
    const promises = discountedOrders.map(orderCouponPromise);
    console.log(`There are ${promises.length} promises to fulfill`);
    let res = await Promise.allSettled(promises).catch(reject);
    const rejected = rejectedResponses(res);
    const rejectionReasons = rejected.map(reason);
    if (rejected.length) {
      console.log(
        `${rejected.length} promises rejected / ${res.length} total responses`
      );
      await writeRejectionReasons(rejectionReasons);
    }
    const fulfilledResponses = getFulfilledResponses(res);
    const responseValues = fulfilledResponses.map(responseValue);
    console.log(`There are ${responseValues.length} successful responses`);
    resolve(responseValues);
  });
};

const couponAttributedRevenue = (ordersWithCouponDetails, coupon) =>
  ordersWithCouponDetails
    .filter(({ coupon_used }) => coupon_used === coupon)
    .reduce((a, b) => a + parseFloat(b.subtotal_inc_tax), 0);

const couponNames = (ordersWithCouponDetails) =>
  ordersWithCouponDetails.map(({ coupon_used }) => coupon_used);

const uniqueCouponNames = (ordersWithCouponDetails) => [
  ...new Set(couponNames(ordersWithCouponDetails)),
];

const emailParagraph = ({ coupon, revenue }) =>
  `<p><strong>Coupon: </strong><span>${coupon}</span>\t<strong>Revenue: </strong><span>${revenue}</span></p>`;

const generateEmail = (couponRank) => couponRank.map(emailParagraph).join("\n");

const matchCodesToOrders = (discountedOrders, responseValues) =>
  responseValues.map(({ orderId, code }) => ({
    ...(discountedOrders.find((order) => order.id === orderId) || {}),
    coupon_used: code,
  }));

const rankCouponsByDescendingRevenue = (totalRevenuePerCoupon) =>
  totalRevenuePerCoupon.sort(descendingRevenue);

getAllOrders({
  min_date_created: startDate.toISOString(),
  max_date_created: endDate.toISOString(),
})
  .then(async (orders) => {
    try {
      const discountedOrders = ordersWithDiscount(orders);
      const responseValues = fetchDiscountedOrderCoupons(discountedOrders);
      const ordersWithCouponDetails = matchCodesToOrders(
        discountedOrders,
        responseValues
      );
      const allCouponsUsed = uniqueCouponNames(ordersWithCouponDetails);
      const totalRevenuePerCoupon = allCouponsUsed.map((coupon) => ({
        coupon,
        revenue: couponAttributedRevenue(ordersWithCouponDetails, coupon),
      }));
      const couponRank = rankCouponsByDescendingRevenue(totalRevenuePerCoupon);
      const out = await output(`${period.monthName}-couponUsage`, couponRank);
      const attachment = Buffer.from(out).toString("base64");
      const email = generateEmail(couponRank);
      const msg = {
        to: "sean@beautyfeatures.ie",
        from: "sean@beautyfeatures.ie",
        subject: `Coupon Usage Stats for ${startDate.toDateString()} to ${endDate.toDateString()}`,
        text: `Coupon Usage Stats for ${startDate.toDateString()} to ${endDate.toDateString()}`,
        html: email,
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
