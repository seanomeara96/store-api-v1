"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyProductsBySKU = void 0;
const getAllProducts_1 = require("./getAllProducts");
const getManyProductsBySKU = (skuArray) => new Promise((resolve, reject) => {
    let promises = [];
    let products = [];
    skuArray.forEach((SKU) => {
        promises.push((0, getAllProducts_1.getAllProducts)({
            sku: Object.values(SKU)[0],
        })
            .then((product) => products.push(product[0]))
            .catch((err) => reject(err)));
    });
    Promise.allSettled(promises)
        .then(() => resolve(products))
        .catch((err) => console.log(err));
});
exports.getManyProductsBySKU = getManyProductsBySKU;
