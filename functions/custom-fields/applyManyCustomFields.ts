import { applyCustomField } from "./applyCustomField";
import { CustomField } from "./getCustomFields";
/**
 * Loops through an array of many customFields and applys them to a single product
 * @param {object[]} productId
 * @param {object[]} customFields
 * @returns
 */
export function applyManyCustomFields(
  productId: number,
  customFields: CustomField[]
) {
  return new Promise(async function (resolve, reject) {
    try {
      for (const { name, value } of customFields) {
        await applyCustomField(productId, name, value);
      }
      resolve(undefined);
    } catch (err) {
      reject(err);
    }
  });
}
