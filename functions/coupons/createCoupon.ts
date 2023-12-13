export function createCoupon(coupon_data: any) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.post(
        "/coupons",
        coupon_data
      );
      resolve(res.data);
    } catch (err: any) {
      reject(err.response.data);
    }
  });
}
