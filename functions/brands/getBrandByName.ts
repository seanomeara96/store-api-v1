import { getAllBrands } from "./getAllBrands";
/**
 * Fetches a brand by name & resolves with a brand object
 * @param {*} name
 * @returns
 */
export const getBrandByName = (name: string) =>
  new Promise((resolve, reject) => {
    getAllBrands({ name })
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
