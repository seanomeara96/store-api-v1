import { CreateProductVariantOptionParams, ProductVariantOption } from "./ProductVariantOption";

export function createProductVariantOption(product_id: number, createProductVariantOptionParams: CreateProductVariantOptionParams):Promise<ProductVariantOption> {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.post(
        `/catalog/products/${product_id}/options`,
        createProductVariantOptionParams
      );
      resolve(res.data.data)
    } catch (err) {
      reject(err);
    }
  });
}
