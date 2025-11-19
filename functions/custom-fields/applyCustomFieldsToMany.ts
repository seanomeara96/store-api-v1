import { applyCustomField } from "./applyCustomField";
/**
 * applies a field (name) and value to multiple products by id
 * @param {object[]} productIds
 * @param {string} name
 * @param {string} value
 * @returns
 */
export async function applyCustomFieldToMany(
  productIds: number[],
  name: string,
  value: string,
) {
  try {
    for (const id of productIds) {
      await applyCustomField(id, name, value);
    }
  } catch (err) {
    throw err;
  }
}
