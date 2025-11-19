import { Category } from "./createCategory";
import { getAllCategories } from "./getAllCategories";

/**
 * Fetches a category object by name, if there are multiple it will reject
 * If there are no categories found, returns undefined
 * @param name
 * @returns
 */
export async function getCategoryByName(
  name: string,
): Promise<Category | undefined> {
  const res = await getAllCategories({ name });
  if (res.length > 1) {
    throw new Error("there are multiple categories with this name");
  }
  if (res.length === 0) {
    return undefined;
  }
  return res[0];
}
