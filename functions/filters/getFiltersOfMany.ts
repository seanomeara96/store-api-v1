import { getFilters } from "./getFilters";
interface productId {
  "Product ID": number;
}
const productIds: productId[] = [
  { "Product ID": 2541 },
  { "Product ID": 2542 },
];

/**
 * Supply product Ids and receive associated filters in a
 * Not quite sure how I got this to work so dont touch it
 * @param {object[]} productIds
 * @returns
 */
export const getFiltersOfMany = (productIds: productId[]) =>
  new Promise((resolve, reject) => {
    let promises = productIds.map((product) =>
      getFilters(Object.values(product)[0])
    );
    Promise.allSettled(promises)
      .then((res) => {
        // I dont know how I got this to stop throwing a type error
        const fulfilled: PromiseFulfilledResult<any>[] = res.filter(
          ({ status }) => status === "fulfilled"
        ) as PromiseFulfilledResult<any>[];
        const filters = fulfilled.map((res) => res.value);
        resolve(filters);
      })
      .catch(reject);
  });
