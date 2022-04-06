export const createCoupon = (coupon_data: any) =>
  new Promise((resolve, reject) =>
    require("../../config/config")
      .store.post("/coupons", coupon_data)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response.data))
  );
