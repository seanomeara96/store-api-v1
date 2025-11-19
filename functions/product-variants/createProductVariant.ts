import {
  CreateProductVariantParams,
  ProductVariant,
} from "../../newclient/products/variants";

export async function createProductVariant(
  product_id: number,
  params: CreateProductVariantParams,
): Promise<ProductVariant> {
  try {
    const res = await require("../../config/config").store.post(
      `/catalog/products/${product_id}/variants`,
      params,
    );
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
