"use strict";
exports.__esModule = true;
exports.getProductIdByName = void 0;
var getAllProducts_1 = require("./getAllProducts");
var getProductIdByName = function (productName) {
    return new Promise(function (resolve, reject) {
        (0, getAllProducts_1.getAllProducts)({ name: productName })
            .then(function (products) {
            if (products.length < 1) {
                reject("No Products");
            }
            else if (products.length > 1) {
                reject("There are multiple producs with that name");
            }
            else {
                resolve(products[0].id);
            }
        })["catch"](function (err) { return console.log("Error in getProductByName", err); });
    });
};
exports.getProductIdByName = getProductIdByName;
