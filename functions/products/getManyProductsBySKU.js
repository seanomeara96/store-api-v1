"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyProductsBySKU = void 0;
const getAllProducts_1 = require("./getAllProducts");
const getManyProductsBySKU = (skuArray) => new Promise((resolve, reject) => {
    if (!skuArray.length)
        return reject("No SKUs provided");
    if (!skuArray[0].hasOwnProperty("sku"))
        return reject("must provide sku number under propery 'sku'");
    let promises = [];
    let products = [];
    skuArray.forEach((SKU) => {
        promises.push((0, getAllProducts_1.getAllProducts)({
            sku: SKU.sku,
        })
            .then((product) => products.push(product[0]))
            .catch((err) => reject(err)));
    });
    Promise.allSettled(promises)
        .then(() => resolve(products))
        .catch((err) => console.log(err));
});
exports.getManyProductsBySKU = getManyProductsBySKU;
