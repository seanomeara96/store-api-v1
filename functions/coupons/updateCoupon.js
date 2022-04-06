"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.updateCoupon = void 0;
var updateCoupon = function (id, fieldToUpdate) {
    return new Promise(function (resolve, reject) {
        require("../../config/config")
            .store.put("/coupons/".concat(id), __assign({}, fieldToUpdate))
            .then(resolve)["catch"](reject);
    });
};
exports.updateCoupon = updateCoupon;
