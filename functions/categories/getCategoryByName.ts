import { getAllCategories } from "./getAllCategories";
/**
 * Fetches a category object by name, if there are multiple it will reject
 * @param {*} name
 * @returns
 */
export const getCategoryByName = (name: string) =>
  new Promise((resolve, reject) =>
    getAllCategories({ name })
      .then((res) => {
        if (res.length > 1)
          return reject("there are multiple categories with this name");
        resolve(res[0]);
      })
      .catch((err) => reject(err))
  );
