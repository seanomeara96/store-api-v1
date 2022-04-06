"use strict";
// 'The route is not found, check the URL'
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoupon = void 0;
const getCoupon = (id) => new Promise((resolve, reject) => require("../../config/config")
    .store.get(`/coupons/${id}`)
    .then(resolve)
    .catch(reject));
exports.getCoupon = getCoupon;
// not been implemented yet
// exports.getCoupon = getCoupon;
