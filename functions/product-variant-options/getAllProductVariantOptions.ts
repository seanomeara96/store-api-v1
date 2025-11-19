import { ProductVariantOption } from "./ProductVariantOption";

/**
 * Copied to client.ts
 * @param product_id
 * @returns
 */
export async function getAllProductVariantOptions(
  product_id: number,
): Promise<ProductVariantOption[]> {
  try {
    const res = await require("../../config/config").store.get(
      `/catalog/products/${product_id}/options`,
    );
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
