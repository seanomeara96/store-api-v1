import { deleteCategory } from "./deleteCategory";
/**
 * has failed by too many requests, do small batches
 * @param category_ids
 * @returns
 */
export async function deleteManyCategories(
  category_ids: { [key: string]: number }[],
): Promise<PromiseSettledResult<void>[]> {
  try {
    const ids = category_ids.map((obj) => Object.values(obj)[0]);
    const promises = ids.map(async (id) => {
      await deleteCategory(id);
    });
    return await Promise.allSettled(promises);
  } catch (err) {
    throw new Error("Error occurred at deleteManyCategories");
  }
}
