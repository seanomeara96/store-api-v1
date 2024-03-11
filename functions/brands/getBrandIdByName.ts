import { Brand } from "./Brand";
import { getBrandByName } from "./getBrandByName";
/**
 * Fetches brand id by name & resolves with a number
 * @param {*} name
 * @returns
 */
export const getBrandIdByName = (name: string): Promise<number | undefined> =>
  new Promise((resolve, reject) => {
    getBrandByName(name)
      .then((i) => resolve(i? i.id : undefined))
      .catch((err) => reject(err));
  });
