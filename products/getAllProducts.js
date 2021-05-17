const { getAll } = require("../requests/getAll");
/**
 * Fetches all products, 250 at a time recursively
 * @param {*} params
 * @returns resolves with an array of product objects
 */
exports.getAllProducts = getAll(`/catalog/products`);
