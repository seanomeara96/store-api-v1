import { getAllProducts } from "./getAllProducts";

export async function getProductsByCategory(category_id: number) {
  try {
    return await getAllProducts({ "categories:in": String(category_id) });
  } catch (error) {
    throw error;
  }
}
