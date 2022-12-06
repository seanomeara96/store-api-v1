import { deleteCategory } from "./deleteCategory";
/**
 * has failed by too many requests, do small batches
 * @param category_ids 
 * @returns 
 */
export function deleteManyCategories(
  category_ids: { [key: string]: number }[]
) {
  return new Promise(async function (resolve, reject) {
    try {
      const ids = category_ids.map((obj) => Object.values(obj)[0]);
      const promises = ids.map((id) => deleteCategory(id));
      const res = await Promise.allSettled(promises);
      resolve(res);
    } catch (err: any) {
      reject("error occured at deleteManyCategories");
    }
  });
}
