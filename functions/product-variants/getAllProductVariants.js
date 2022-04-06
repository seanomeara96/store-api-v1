"use strict";
const getAllProductVariants = (productId) => {
    return new Promise((resolve, reject) => {
        if (typeof productId !== "number") {
            return reject("product id must be a number");
        }
        require("../config/config")
            .store.get(`/catalog/products/${productId}/variants`)
            .then((res) => resolve(res.data.data))
            .catch((err) => {
            console.log(err);
            reject("could not get product variants");
        });
    });
};
exports.getAllProductVariants = getAllProductVariants;
