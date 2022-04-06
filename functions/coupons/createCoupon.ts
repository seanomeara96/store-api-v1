export const createCoupon = (coupon_data: any) =>
  new Promise((resolve, reject) =>
    require("../../config/config")
      .store.post("/coupons", coupon_data)
      .then((res: any) => resolve(res.data))
      .catch((err: any) => reject(err.response.data))
  );
