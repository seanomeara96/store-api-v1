const { getAll } = require("../utils/getAll");
/**
 * Fetches all products, 250 at a time recursively
 * @param {*} params
 * @returns resolves with an array of product objects
 */
const getAllProducts = getAll(`/catalog/products`);

exports.getAllProducts = getAllProducts;