// 'The route is not found, check the URL'

export const getCoupon = (id: number) =>
  new Promise((resolve, reject) =>
    require("../../config/config")
      .store.get(`/coupons/${id}`)
      .then(resolve)
      .catch(reject)
  );


// not been implemented yet
// exports.getCoupon = getCoupon;
