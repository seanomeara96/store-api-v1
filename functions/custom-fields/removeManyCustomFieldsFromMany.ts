import { removeManyFilters } from "./removeManyCustomFields";

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
/**
 * Takes product Ids JSON and an Objetc with name and value properties for filters
 * @param {object} productIds
 * @param {object} filters
 * @returns
 */
export const removeManyFiltersFromMany = (
  productIds: { [key: string]: number }[],
  filters: { name: string; value: string }[]
) =>
  new Promise((resolve, reject) => {
    let promises = productIds.map((product) => {
      let idNumber = Object.values(product)[0];
      return removeManyFilters(idNumber, filters);
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });
