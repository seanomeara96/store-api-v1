export async function createCoupon(coupon_data: any): Promise<any> {
  try {
    const res = await require("../../config/config").store.post(
      "/coupons",
      coupon_data,
    );
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
}
