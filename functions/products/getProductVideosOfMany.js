"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductVideosOfMany = void 0;
const getProductVideos_1 = require("./getProductVideos");
const getProductVideosOfMany = (productIds) => new Promise((resolve, reject) => {
    const promises = productIds.map((productId) => {
        const id = Object.values(productId)[0];
        return (0, getProductVideos_1.getProductVideos)(id);
    });
    Promise.allSettled(promises)
        .then((responses) => {
        const fulfilledResponses = responses.filter((response) => response.status === "fulfilled");
        const productVideos = fulfilledResponses.map((response) => response.value);
        resolve(productVideos);
    })
        .catch((err) => reject(err));
});
exports.getProductVideosOfMany = getProductVideosOfMany;
