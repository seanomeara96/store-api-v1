"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCoupon = void 0;
const createCoupon = (coupon_data) => new Promise((resolve, reject) => require("../../config/config")
    .store.post("/coupons", coupon_data)
    .then((res) => resolve(res.data))
    .catch((err) => reject(err.response.data)));
exports.createCoupon = createCoupon;
