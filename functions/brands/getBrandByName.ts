import { Brand } from "./Brand";
import { getAllBrands } from "./getAllBrands";
/**
 * Fetches a brand by name & resolves with a brand object
 * @param {*} name
 * @returns
 */
export async function getBrandByName(name: string): Promise<Brand | undefined> {
  try {
    const res = await getAllBrands({ name });

    if (res.length < 1) {
      return undefined;
    }

    if (res.length > 1) {
      throw `many brands with name ${name}`;
    }

    return res[0];
  } catch (err) {
    throw err;
  }
}
