/**
 * Gets all images of a given product by id
 * @param {number} product_id
 * @returns
 */
export const getAllProductImages = (
  product_id: number
): Promise<{ product_id: number; images: any[] }> =>
  new Promise((resolve, reject) => {
    if (typeof product_id !== "number") reject("product id must be a number");
    require("../../config/config")
      .store.get(`/catalog/products/${product_id}/images`)
      .then((res: any) => resolve({ product_id, images: res.data.data }))
      .catch((err: any) => reject(err));
  });
