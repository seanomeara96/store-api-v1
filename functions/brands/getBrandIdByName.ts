import { Brand } from "./Brand";
import { getBrandByName } from "./getBrandByName";
/**
 * Fetches brand id by name & resolves with a number
 * @param {*} name
 * @returns
 */
export const getBrandIdByName = async (
  name: string,
): Promise<number | undefined> => {
  try {
    const brand = await getBrandByName(name);
    return brand ? brand.id : undefined;
  } catch (error) {
    throw error;
  }
};
