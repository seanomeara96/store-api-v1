"use strict";
exports.__esModule = true;
exports.getBrandById = void 0;
var getBrandById = function (brand_id) {
    return new Promise(function (resolve, reject) {
        return require("../../config/config")
            .store.get("/catalog/brands/".concat(brand_id))
            .then(function (_a) {
            var data = _a.data;
            return resolve(data.data);
        })["catch"](reject);
    });
};
exports.getBrandById = getBrandById;
