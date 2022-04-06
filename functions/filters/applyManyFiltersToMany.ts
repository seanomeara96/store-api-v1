import { applyManyFilters } from "./applyManyFilters";

/**
 * for each product this function applies many filters
 * @param {object[]} productIds
 * @param {object[]} filters
 * @returns
 */
export const applyManyFiltersToMany = (
  productIds: { [key: string]: number }[],
  filters: { [key: string]: string }[]
) =>
  new Promise((resolve, reject) => {
    let promises = productIds.map((product) => {
      const idNumber = Object.values(product)[0];
      return applyManyFilters(idNumber, filters);
    });
    Promise.allSettled(promises)
      .then((results) => resolve(results))
      .catch(reject);
  });

const productIDs = [
  { "Product ID": 177 },
  { "Product ID": 178 },
  { "Product ID": 179 },
  { "Product ID": 180 },
  { "Product ID": 181 },
];

const filters = [
  {
    name: "Proceive",
    value: "Men",
  },
  {
    name: "Proceive",
    value: "Women",
  },
  {
    name: "Proceive",
    value: "Men & Women",
  },
];
