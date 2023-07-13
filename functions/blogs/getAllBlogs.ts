import { getAll } from "../utils/getAll";
import { BlogPost } from "./BlogPost";
/**
 * This function fetches all brands resolves with an array of objects
 * @param {object} params
 * @returns
 */
export const getAllBlogs = getAll("/blog/posts") as (params?: {}) => Promise<BlogPost[]>
