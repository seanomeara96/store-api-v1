import { applyCustomField } from "./applyCustomField";
import { NewCustomField } from "./getCustomFields";
/**
 * Loops through an array of many customFields and applys them to a single product
 * @param {object[]} productId
 * @param {object[]} customFields
 * @returns
 */
export async function applyManyCustomFields(
  productId: number,
  customFields: NewCustomField[],
) {
  try {
    for (const { name, value } of customFields) {
      await applyCustomField(productId, name, value);
    }
  } catch (err) {
    throw err;
  }
}
