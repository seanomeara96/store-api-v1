"use strict";
exports.__esModule = true;
exports.getBrandByName = void 0;
var getAllBrands_1 = require("./getAllBrands");
/**
 * Fetches a brand by name & resolves with a brand object
 * @param {*} name
 * @returns
 */
var getBrandByName = function (name) {
    return new Promise(function (resolve, reject) {
        (0, getAllBrands_1.getAllBrands)({ name: name })
            .then(function (res) { return resolve(res[0]); })["catch"](function (err) { return reject(err); });
    });
};
exports.getBrandByName = getBrandByName;
