"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByName = void 0;
const getAllProducts_1 = require("./getAllProducts");
const getProductByName = (productName) => new Promise((resolve, reject) => {
    (0, getAllProducts_1.getAllProducts)({ name: productName })
        .then((products) => {
        if (products.length < 1) {
            reject("No Products");
        }
        else if (products.length > 1) {
            reject("There are multiple producs with that name");
        }
        else {
            resolve(products[0]);
        }
    })
        .catch((err) => console.log("Error in getProductByName", err));
});
exports.getProductByName = getProductByName;
