import { getAll } from "../utils/getAll";
import { Category } from "./createCategory";
/**
 * This function fetches all categories resolves with an array of objects
 * @param {*} params
 * @returns
 */
export type GetAllCategoriesParams = {
  page?: number;
  limit?: number;
  name?: string;
  parent_id?: number;
  is_visible?: boolean;
  min_id?: number;
  max_id?: number;
};

export const getAllCategories = getAll("/catalog/categories") as (
  params?: GetAllCategoriesParams,
) => Promise<Category[]>;
