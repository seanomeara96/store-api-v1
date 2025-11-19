import { getOrderProducts } from "./getOrderProducts";
export async function getOrderProductNames(order: any) {
  try {
    const products = await getOrderProducts(order);
    return products.map((product: any) => product.name);
  } catch (error) {
    throw error;
  }
}
