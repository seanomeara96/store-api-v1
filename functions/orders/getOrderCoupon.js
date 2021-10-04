/**
 * gets the coupon used in an order
 * requires v2
 * @param {number} orderId
 * @param {string} resource
 * @returns
 */
const getOrderCoupon = (orderId, resource) =>
  new Promise((resolve, reject) => {
    if (typeof orderId !== "number") {
      console.log("typeof orderId", typeof orderId);
      return reject("order id must be a number");
    }
    if (typeof resource !== "string") {
      console.log("typeof resource", typeof resource);
      return reject("resource must be a path string");
    }
    require("../../config/config")
      .store.get(resource)
      .then((e) => resolve({ orderId, code: e.data[0].code }))
      .catch(reject);
  });

exports.getOrderCoupon = getOrderCoupon;
