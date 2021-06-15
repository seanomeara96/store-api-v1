require("../config/config").config("bf")
const { getAll } = require("../utils/getAll");
/**
 * This function fetches all brands resolves with an array of objects
 * @param {*} params
 * @returns
 */
exports.getAllBrands = getAll("/catalog/brands");
