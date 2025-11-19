import { applyManyCustomFields } from "./applyManyCustomFields";
import { CustomField } from "./getCustomFields";

/**
 * for each product this function applies many filters
 * @param {object[]} productIds
 * @param {object[]} filters
 * @returns
 */
export async function applyManyFiltersToMany(
  productIds: number[],
  filters: CustomField[],
) {
  try {
    for (const id of productIds) {
      await applyManyCustomFields(id, filters);
    }
  } catch (err) {
    throw err;
  }
}
