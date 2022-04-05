"use strict";
exports.__esModule = true;
exports.getCategoryByName = void 0;
var getAllCategories_1 = require("./getAllCategories");
/**
 * Fetches a category object by name, if there are multiple it will reject
 * @param {*} name
 * @returns
 */
var getCategoryByName = function (name) {
    return new Promise(function (resolve, reject) {
        return (0, getAllCategories_1.getAllCategories)({ name: name })
            .then(function (res) {
            if (res.length > 1)
                return reject("there are multiple categories with this name");
            resolve(res[0]);
        })["catch"](function (err) { return reject(err); });
    });
};
exports.getCategoryByName = getCategoryByName;
