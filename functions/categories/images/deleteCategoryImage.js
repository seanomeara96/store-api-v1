"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryImage = void 0;
/**
 * deletes a category's image by id
 * @param {number} category_id
 * @returns promise containing success / failure status
 */
const deleteCategoryImage = (category_id) => new Promise((resolve, reject) => {
    if (typeof category_id !== "number")
        return reject("cat id must be a number");
    require("../../config/config")
        .store.delete(`/catalog/categories/${category_id}/image`)
        .then(({ status }) => status === 204
        ? resolve("Successfully deleted category Image.")
        : reject("Something went wrong deleting category Image."))
        .catch(reject);
});
exports.deleteCategoryImage = deleteCategoryImage;
