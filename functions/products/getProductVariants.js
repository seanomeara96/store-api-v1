"use strict";
exports.__esModule = true;
exports.getProductVariants = void 0;
function getProductVariants(product_id) {
    return new Promise(function (resolve, reject) {
        require("../../config/config")
            .store.get("/catalog/products/".concat(product_id, "/variants"))
            .then(function (res) { return resolve(res.data.data); })["catch"](reject);
    });
}
exports.getProductVariants = getProductVariants;
