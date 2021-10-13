const { getAll } = require("../utils/getAll");
/**
 * This function fetches all brands resolves with an array of objects
 * @param {object} params
 * @returns
 */
const getAllBrands = getAll("/catalog/brands");
exports.getAllBrands = getAllBrands;