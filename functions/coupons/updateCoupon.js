
const updateCoupon = (id, fieldToUpdate) =>
  new Promise((resolve, reject) => {
    require("../../config/config")
      .store.put(`/coupons/${id}`, {
        ...fieldToUpdate
      })
      .then(resolve)
      .catch(reject);
  });
exports.updateCoupon = updateCoupon;
