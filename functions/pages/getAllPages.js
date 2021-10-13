const { getAll } = require("../utils/getAll");
/**
 * gats all pages
 */
const getAllPages = getAll("/content/pages");

exports.getAllPages = getAllPages;