import { ProductImage } from "./getProductImage";


export const getAllProductImages = (
  product_id: number
): Promise<ProductImage[]> =>
  new Promise((resolve, reject) => {
    if (typeof product_id !== "number") reject("product id must be a number");
    require("../../config/config")
      .store.get(`/catalog/products/${product_id}/images`)
      .then((res: any) => resolve(res.data.data))
      .catch((err: any) => reject(err));
  });
