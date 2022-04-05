"use strict";
exports.__esModule = true;
exports.getBrandIdByName = void 0;
var getBrandByName_1 = require("./getBrandByName");
/**
 * Fetches brand id by name & resolves with a number
 * @param {*} name
 * @returns
 */
var getBrandIdByName = function (name) {
    return new Promise(function (resolve, reject) {
        (0, getBrandByName_1.getBrandByName)(name)
            .then(function (i) { return resolve(i.id); })["catch"](function (err) { return reject(err); });
    });
};
exports.getBrandIdByName = getBrandIdByName;
