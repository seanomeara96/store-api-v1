"use strict";
exports.__esModule = true;
exports.getBrandById = void 0;
var getBrandById = function (brand_id) {
    return new Promise(function (resolve, reject) {
        return require("../../config/config")
            .store.get("/catalog/brands/".concat(brand_id))
            .then(function (res) { return resolve(res.data.data); })["catch"](reject);
    });
};
exports.getBrandById = getBrandById;
