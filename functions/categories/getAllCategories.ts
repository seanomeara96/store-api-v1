import { getAll } from "../utils/getAll";
/**
 * This function fetches all categories resolves with an array of objects
 * @param {*} params
 * @returns
 */
export const getAllCategories = getAll("/catalog/categories");


