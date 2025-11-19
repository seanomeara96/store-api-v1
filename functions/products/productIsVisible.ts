import { updateProduct } from "./updateProduct";

export async function productIsVisible(productId: number, is_visible: boolean) {
  try {
    const result = await updateProduct(productId, {
      is_visible,
    });
    return result;
  } catch (error) {
    throw error;
  }
}
