/**
 * gets the coupon used in an order
 * requires v2
 * @param {number} orderId
 * @param {string} resource
 * @returns
 */
export async function getOrderCoupon(
  orderId: number,
  resource: string,
): Promise<{ orderId: number; code: string }> {
  if (typeof orderId !== "number") {
    console.log("typeof orderId", typeof orderId);
    throw new Error("order id must be a number");
  }
  if (typeof resource !== "string") {
    console.log("typeof resource", typeof resource);
    throw new Error("resource must be a path string");
  }

  try {
    const config = require("../../config/config");
    const e = await config.store.get(resource);
    return { orderId, code: e.data[0].code };
  } catch (error) {
    throw error;
  }
}
