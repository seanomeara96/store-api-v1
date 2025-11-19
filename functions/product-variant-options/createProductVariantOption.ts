import {
  CreateProductVariantOptionParams,
  ProductVariantOption,
} from "./ProductVariantOption";

/**
 * Copied to client.ts
 * @param product_id
 * @param createProductVariantOptionParams
 * @returns
 */
export async function createProductVariantOption(
  product_id: number,
  createProductVariantOptionParams: CreateProductVariantOptionParams,
): Promise<ProductVariantOption> {
  try {
    const res = await require("../../config/config").store.post(
      `/catalog/products/${product_id}/options`,
      createProductVariantOptionParams,
    );
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
