import { Product } from "./Product";

export function getProductById(productId: number): Promise<Product> {
  return new Promise((resolve, reject) =>
    require("../../config/config")
      .store.get(`/catalog/products/${productId}`)
      .then((response: any) => resolve(response.data.data))
      .catch((ex: any) => reject(ex.response))
  );
}
