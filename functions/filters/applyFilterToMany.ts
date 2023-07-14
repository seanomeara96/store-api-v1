import { applyFilter } from "./applyFilter";
/**
 * applies a field (name) and value to multiple products by id
 * @param {object[]} productIds
 * @param {string} name
 * @param {string} value
 * @returns
 */
export function applyFilterToMany(
  productIds: { [key: string]: number }[],
  name: string,
  value: string
) {
  return new Promise(async function (resolve, reject) {
    try {
      const promises = [];
      for (const productId of productIds) {
        const idNumber: number = Object.values(productId)[0];
        promises.push(applyFilter(idNumber, name, value));
      }
      const res = await Promise.allSettled(promises);
      resolve(res)
    } catch (err) {
      reject(err);
    }
  });
}
