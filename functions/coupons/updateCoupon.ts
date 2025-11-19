export async function updateCoupon(id: number, fieldToUpdate: any) {
  try {
    const config = require("../../config/config");
    await config.store.put(`/coupons/${id}`, { ...fieldToUpdate });
  } catch (error) {
    throw error;
  }
}
