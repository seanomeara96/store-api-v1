import { Category } from "./createCategory";
import { getAllCategories } from "./getAllCategories";
/**
 * Fetches a category object by name, if there are multiple it will reject
 * @param name
 * @returns
 */
export async function getCategoryByName(
  name: string
): Promise<Category | undefined> {
  try {
    const res = await getAllCategories({ name });
    if (res.length > 1) {
      throw "there are multiple categories with this name";
    }
    return res[0];
  } catch (err) {
    throw err;
  }
}
