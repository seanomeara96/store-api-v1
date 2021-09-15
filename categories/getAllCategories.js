const {getAll} = require("../utils/getAll");
/**
 * This function fetches all categories resolves with an array of objects
 * @param {*} params
 * @returns
 */
const getAllCategories = getAll("/catalog/categories");
exports.getAllCategories = getAllCategories;
//require("../config/config").config("bf");getAllCategories().then(res => console.log(res))