import { applyManyCustomFields } from "./applyManyCustomFields";
import { CustomField } from "./getCustomFields";

/**
 * for each product this function applies many filters
 * @param {object[]} productIds
 * @param {object[]} filters
 * @returns
 */
export function applyManyFiltersToMany (
  productIds: number[],
  filters: CustomField[]
) {
  return new Promise(async function (resolve, reject) {
    try {
      for(const id of productIds){
        await applyManyCustomFields(id, filters)
      }
      resolve(undefined)
    } catch(err) {
      reject(err)
    }
  });
}

