import { ProductVariant } from "../product-variants/ProductVariant";

export function getProductVariants(product_id: number):Promise<ProductVariant[]> {
  return new Promise((resolve, reject) => {
    require("../../config/config")
      .store.get(`/catalog/products/${product_id}/variants`)
      .then((res: any) => resolve(res.data.data as ProductVariant[]))
      .catch(reject);
  });
}
