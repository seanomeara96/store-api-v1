import { Category } from "./createCategory";

export async function getCategory(category_id: number) {
  try {
    if (typeof category_id !== "number") throw "supply a number";
    const response = await require("../../config/config").store.get(
      `/catalog/categories/${category_id}`
    );
    return response.data.data as Category
  } catch (err: any) {
    throw err.response;
  }
}
