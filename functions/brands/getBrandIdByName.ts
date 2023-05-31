import { Brand } from "./Brand";
import { getBrandByName } from "./getBrandByName";
/**
 * Fetches brand id by name & resolves with a number
 * @param {*} name
 * @returns
 */
export const getBrandIdByName = (name: string): Promise<number> =>
  new Promise((resolve, reject) => {
    getBrandByName(name)
      .then((i: Brand) => resolve(i.id))
      .catch((err) => reject(err));
  });
