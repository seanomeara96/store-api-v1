import { Brand } from "./Brand";
import { getAllBrands } from "./getAllBrands";
/**
 * Fetches a brand by name & resolves with a brand object
 * @param {*} name
 * @returns
 */
export function getBrandByName(name: string): Promise<Brand | undefined> {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await getAllBrands({ name });

      if (res.length < 1) {
        resolve(undefined)
        return
      }

      if (res.length > 1) {
        throw `many brands with name ${name}`
      }

      resolve(res[0])

    } catch (err) {
      reject(err);
    }
  });
}
