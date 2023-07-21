export interface ProductImage {
  id: number;
  product_id: number;
  is_thumbnail: boolean;
  sort_order: number;
  description: string;
  image_file: string;
  url_zoom: string;
  url_standard: string;
  url_thumbnail: string;
  url_tiny: string;
  date_modified: string;
}

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
