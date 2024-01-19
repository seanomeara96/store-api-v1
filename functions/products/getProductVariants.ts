import { AxiosError } from "axios";
import { ProductVariant } from "../product-variants/ProductVariant";

type Variants = ProductVariant[];
export function getProductVariants(product_id: number): Promise<Variants> {
  return new Promise(function (resolve, reject) {
    require("../../config/config")
      .store.get(`/catalog/products/${product_id}/variants`)
      .then((res: any) => resolve(res.data.data as ProductVariant[]))
      .catch((err: AxiosError) =>
        reject(err.response ? err.response.data : err)
      );
  });
}


