"use strict";
// 'The route is not found, check the URL'
exports.__esModule = true;
exports.getCoupon = void 0;
var getCoupon = function (id) {
    return new Promise(function (resolve, reject) {
        return require("../../config/config")
            .store.get("/coupons/".concat(id))
            .then(resolve)["catch"](reject);
    });
};
exports.getCoupon = getCoupon;
// not been implemented yet
// exports.getCoupon = getCoupon;
