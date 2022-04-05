"use strict";
exports.__esModule = true;
exports.getCategoryIdByName = void 0;
var getCategoryByName_1 = require("./getCategoryByName");
var getCategoryIdByName = function (name) {
    return new Promise(function (resolve, reject) {
        return (0, getCategoryByName_1.getCategoryByName)(name)
            .then(function (i) { return resolve(i.id); })["catch"](function (err) { return reject(err); });
    });
};
exports.getCategoryIdByName = getCategoryIdByName;
