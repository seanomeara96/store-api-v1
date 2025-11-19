/**
 * Updates a category. Must supply a valid field.
 * @param catId - The ID of the category to update.
 * @param fieldToUpdate - The fields to update in the category.
 * @returns A promise that resolves with the updated category data.
 */
export async function updateCategory(
  catId: number,
  fieldToUpdate: Record<string, unknown>,
): Promise<any> {
  if (typeof catId !== "number") {
    throw new Error("Product ID must be a number.");
  }

  if (typeof fieldToUpdate !== "object" || fieldToUpdate === null) {
    throw new Error("Field to update must be an object.");
  }

  try {
    const config = require("../../config/config");
    const res = await config.store.put(`/catalog/categories/${catId}`, {
      ...fieldToUpdate,
    });
    return res.data.data;
  } catch (err: any) {
    throw new Error(err.response.data);
  }
}
