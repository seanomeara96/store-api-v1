import { Product } from "./Product";

export async function getProductById(productId: number): Promise<Product> {
  try {
    const response = await require("../../config/config").store.get(
      `/catalog/products/${productId}`,
    );
    return response.data.data;
  } catch (ex: any) {
    throw ex.response;
  }
}
