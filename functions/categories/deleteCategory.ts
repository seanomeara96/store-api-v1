import { getCategory } from "./getCategory";
import { createRedirect } from "../redirects/createRedirect";

export function deleteCategory(category_id: number) {
  return new Promise(async function (resolve, reject) {
    try {
      const category = await getCategory(category_id) as any;
      if (!category) return reject("no matching category");
      await createRedirect(category.custom_url.url, "/");
      await require("../../config/config").store.delete(
        `/catalog/categories/${category_id}`
      );
      resolve(`successfully deleted ${category.name}`)
    } catch (err) {
      reject(err);
    }
  });
}
