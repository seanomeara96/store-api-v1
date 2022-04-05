import { getAll } from "../utils/getAll";
/**
 * This function fetches all brands resolves with an array of objects
 * @param {object} params
 * @returns
 */
export const getAllBlogs = getAll("/blog/posts");
