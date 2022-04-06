import { applyFilter } from "./applyFilter";
/**
 * applies a field (name) and value to multiple products by id
 * @param {object[]} productIds
 * @param {string} name
 * @param {string} value
 * @returns
 */
export const applyFilterToMany = (
  productIds: { [key: string]: number }[],
  name: string,
  value: string
) =>
  new Promise((resolve, reject) => {
    let promises = [];
    productIds.forEach((product) => {
      const idNumber: number = Object.values(product)[0];
      promises.push(applyFilter(idNumber, name, value));
    });
    Promise.allSettled(promises)
      .then((results) => resolve(results))
      .catch(reject);
  });


