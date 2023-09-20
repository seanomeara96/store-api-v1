import { getAll } from "../utils/getAll";
import { Category } from "./createCategory";
/**
 * This function fetches all categories resolves with an array of objects
 * @param {*} params
 * @returns
 */
export const getAllCategories = getAll("/catalog/categories") as (
    params?: any
  ) => Promise<Category[]>;


