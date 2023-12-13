import { applyCustomField } from "./applyCustomField";
/**
 * applies a field (name) and value to multiple products by id
 * @param {object[]} productIds
 * @param {string} name
 * @param {string} value
 * @returns
 */
export function applyCustomFieldToMany(
  productIds: number[],
  name: string,
  value: string
) {
  return new Promise(async function (resolve, reject) {
    try {
      for (const id of productIds) {
        await applyCustomField(id, name, value)
      }
      resolve(undefined)
    } catch (err) {
      reject(err);
    }
  });
}
