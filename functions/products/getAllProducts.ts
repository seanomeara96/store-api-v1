import { getAll } from "../utils/getAll";
/**
 * Fetches all products, 250 at a time recursively
 * @param {*} params
 * @returns resolves with an array of product objects
 */
export const getAllProducts = getAll(`/catalog/products`);