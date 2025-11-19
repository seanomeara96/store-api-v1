import { createCategory, Category } from "./createCategory";

export function createManyCategories(categoriesToCreate: Category[]) {
  return Promise.allSettled(
    categoriesToCreate.map((newCategory) => createCategory(newCategory)),
  );
}
