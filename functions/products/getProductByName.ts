import { Product } from "./Product";
import { getAllProducts } from "./getAllProducts";

export async function getProductByName(productName: string): Promise<Product> {
  try {
    const products = await getAllProducts({ name: productName });
    return products[0];
  } catch (err) {
    throw err;
  }
}
