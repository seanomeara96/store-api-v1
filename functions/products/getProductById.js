"use strict";
exports.__esModule = true;
exports.getProductById = void 0;
function getProductById(productId) {
    return new Promise(function (resolve, reject) {
        return require("../../config/config")
            .store.get("/catalog/products/".concat(productId))
            .then(function (response) { return resolve(response.data.data); })["catch"](function (ex) { return reject(ex.response); });
    });
}
exports.getProductById = getProductById;
