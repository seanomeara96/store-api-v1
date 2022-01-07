const { getAll } = require("../utils/getAll");
/**
 * This function fetches all brands resolves with an array of objects
 * @param {object} params
 * @returns
 */
const getAllBlogs = getAll("/blog/posts");
exports.getAllBlogs = getAllBlogs;