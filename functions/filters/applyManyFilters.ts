import { applyFilter } from "./applyFilter";
/**
 * Loops through an array of many filters and applys them to a single product
 * @param {object[]} productId
 * @param {object[]} filters
 * @returns
 */
export const applyManyFilters = (
  productId: number,
  filters: { [key: string]: string }[]
) =>
  new Promise((resolve, reject) => {
    const promises = filters.map(({ name, value }) => {
      return applyFilter(productId, name, value);
    });
    Promise.allSettled(promises)
      .then((results) => resolve(results))
      .catch(reject);
  });
