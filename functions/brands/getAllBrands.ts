import { getAll } from "../utils/getAll";
import { Brand } from "./Brand";
/**
 * This function fetches all brands resolves with an array of objects
 * @param {object} params
 * @returns
 */
export const getAllBrands = getAll("/catalog/brands") as (
    params?: any
  ) => Promise<Brand[]>;
