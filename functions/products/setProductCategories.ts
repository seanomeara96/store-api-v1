import { updateProduct } from "./updateProduct";

export function setProductCategories(
  product_id: number,
  product_cats: number[]
) {
  return new Promise(async function (resolve, reject) {
    try {
      if (typeof product_id !== "number") {
        throw `id must be a number`;
      }
      if (!product_cats.length) {
        throw `must supply at least one category`;
      }
      if (!Array.isArray(product_cats)) {
        throw `must supply an arrayof ids`;
      }
      for (const cat_id of product_cats) {
        if (typeof cat_id !== "number") {
          throw `category ids must all be numbers`;
        }
      }

      const res = await updateProduct(product_id, {
        categories: product_cats
      });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}
