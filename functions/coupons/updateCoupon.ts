
export const updateCoupon = (id: number, fieldToUpdate: any) =>
  new Promise((resolve, reject) => {
    require("../../config/config")
      .store.put(`/coupons/${id}`, {
        ...fieldToUpdate
      })
      .then(resolve)
      .catch(reject);
  });
