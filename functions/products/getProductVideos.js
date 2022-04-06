"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductVideos = void 0;
const getProductVideos = (product_id) => {
    return new Promise((resolve, reject) => {
        require("../../config/config")
            .store.get(`/catalog/products/${product_id}/videos`)
            .then((res) => resolve({ product_id, videos: res.data.data }))
            .catch((err) => reject(err.response.data));
    });
};
exports.getProductVideos = getProductVideos;
