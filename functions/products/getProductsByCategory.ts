import { getAllProducts } from "./getAllProducts";

export const getProductsByCategory = (category_id: number) =>
  new Promise((resolve, reject) =>
    getAllProducts({ "categories:in": category_id }).then(resolve).catch(reject)
  );
