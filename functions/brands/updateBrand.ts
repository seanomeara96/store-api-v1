import { Brand } from "./Brand";

/**
 * updates a brand. must supply a valid field
 * @param {number} brandId
 * @param {object} fieldToUpdate
 * @returns promise
 */
export async function updateBrand(
  brandId: number,
  fieldToUpdate: Record<string, any>,
): Promise<Brand> {
  if (typeof brandId !== "number") {
    throw new Error("Brand ID must be a number");
  }

  if (typeof fieldToUpdate !== "object" || fieldToUpdate === null) {
    throw new Error("Field to update must be a non-null object");
  }

  const config = require("../../config/config");
  try {
    const res = await config.store.put(
      `/catalog/brands/${brandId}`,
      fieldToUpdate,
    );
    return res.data.data as Brand;
  } catch (err: any) {
    throw err.response.data;
  }
}
