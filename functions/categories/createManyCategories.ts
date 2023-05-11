import { createCategory, Category } from "./createCategory";

export function createManyCategories(categoriesToCreate: Category[]) {
  return new Promise(async function (resolve, reject) {
    try {
      const promises = [];
      for (let i = 0; i < categoriesToCreate.length; i++) {
        const newCategory = categoriesToCreate[i];
        promises.push(createCategory(newCategory));
      }
      const res = await Promise.allSettled(promises);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}
