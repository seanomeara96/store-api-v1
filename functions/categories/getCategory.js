"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategory = void 0;
function getCategory(category_id) {
    return new Promise((resolve, reject) => {
        if (typeof category_id !== "number")
            return reject("supply a number");
        require("../../config/config")
            .store.get(`/catalog/categories/${category_id}`)
            .then((response) => resolve(response.data.data))
            .catch((err) => reject(err.response));
    });
}
exports.getCategory = getCategory;
