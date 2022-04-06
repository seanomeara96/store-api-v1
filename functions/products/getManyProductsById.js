"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyProductsById = void 0;
const getAllProducts_1 = require("./getAllProducts");
const getManyProductsById = (idArray) => new Promise((resolve, reject) => {
    let promises = [];
    let products = [];
    idArray.forEach((id) => {
        promises.push((0, getAllProducts_1.getAllProducts)({
            id,
        })
            .then((product) => products.push(product[0]))
            .catch((err) => reject(err)));
    });
    Promise.allSettled(promises)
        .then(() => resolve(products))
        .catch((err) => console.log(err));
});
exports.getManyProductsById = getManyProductsById;
// 3615
