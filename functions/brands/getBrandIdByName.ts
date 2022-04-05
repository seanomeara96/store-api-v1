import { getBrandByName } from "./getBrandByName";
/**
 * Fetches brand id by name & resolves with a number
 * @param {*} name
 * @returns
 */
export const getBrandIdByName = (name: string) =>
  new Promise((resolve, reject) => {
    getBrandByName(name)
      .then((i:any) => resolve(i.id))
      .catch((err) => reject(err));
  });
