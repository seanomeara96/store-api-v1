"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductVariants = void 0;
function getProductVariants(product_id) {
    return new Promise((resolve, reject) => {
        require("../../config/config")
            .store.get(`/catalog/products/${product_id}/variants`)
            .then((res) => resolve(res.data.data))
            .catch(reject);
    });
}
exports.getProductVariants = getProductVariants;
