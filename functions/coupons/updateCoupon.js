"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCoupon = void 0;
const updateCoupon = (id, fieldToUpdate) => new Promise((resolve, reject) => {
    require("../../config/config")
        .store.put(`/coupons/${id}`, Object.assign({}, fieldToUpdate))
        .then(resolve)
        .catch(reject);
});
exports.updateCoupon = updateCoupon;
