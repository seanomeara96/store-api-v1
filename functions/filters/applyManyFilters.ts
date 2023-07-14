import { applyFilter } from "./applyFilter";
/**
 * Loops through an array of many filters and applys them to a single product
 * @param {object[]} productId
 * @param {object[]} filters
 * @returns
 */
export function applyManyFilters(
  productId: number,
  filters: { [key: string]: string }[]
) {
  return new Promise(async function (resolve) {
    resolve(
      await Promise.allSettled(
        filters.map(({ name, value }) => applyFilter(productId, name, value))
      )
    );
  });
}
