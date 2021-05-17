const { getAll } = require("../requests/getAll");
/**
 * This function fetches all brands resolves with an array of objects
 * @param {*} params
 * @returns
 */
exports.getAllBrands = getAll("/catalog/brands");
