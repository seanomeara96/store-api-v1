import { Brand } from "./Brand";

/**
 * updates a brand. must supply a valid field
 * @param {number} brandId
 * @param {object} fieldToUpdate
 * @returns promise
 */
export function updateBrand(
  brandId: number,
  fieldToUpdate: any
): Promise<Brand> {
  return new Promise((resolve, reject) => {
    if (typeof brandId !== "number")
      return reject("product id must be a number");

    if (typeof fieldToUpdate !== "object")
      return reject("field to update must be an object");

    require("../../config/config")
      .store.put(`/catalog/brands/${brandId}`, {
        ...fieldToUpdate,
      })
      .then((res: any) => resolve(res.data.data as Brand))
      .catch((err: any) => reject(err.response.data));
  });
}
