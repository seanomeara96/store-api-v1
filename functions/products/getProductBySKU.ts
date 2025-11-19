import { Product } from "./Product";
import { getProductById } from "./getProductById";
import { getProductIdFromSku } from "./getProductIdFromSku";

export async function getProductBySku(
  sku: string,
): Promise<Product | undefined> {
  try {
    const id = await getProductIdFromSku(sku);
    if (!id) {
      return undefined;
    }
    const product = await getProductById(id);
    return product;
  } catch (err) {
    throw err;
  }
}
