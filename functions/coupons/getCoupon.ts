// 'The route is not found, check the URL'

export async function getCoupon(id: number) {
  try {
    const config = require("../../config/config");
    const result = await config.store.get(`/coupons/${id}`);
    return result;
  } catch (error) {
    throw error;
  }
}

// not been implemented yet
// exports.getCoupon = getCoupon;
