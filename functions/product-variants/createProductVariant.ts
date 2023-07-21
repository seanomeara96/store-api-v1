import { CreateProductVariantParams, ProductVariant } from "./ProductVariant";

export function createProductVariant(
  product_id: number,
  params: CreateProductVariantParams
): Promise<ProductVariant> {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.post(
        `/catalog/products/${product_id}/variants`,
        params
      );
      resolve(res.data.data)
    } catch (err) {
      reject(err);
    }
  });
}
