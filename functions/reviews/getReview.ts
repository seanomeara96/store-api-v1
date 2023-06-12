import { Review } from "./Review";

export function getReview(
  product_id: number,
  review_id: number
): Promise<Review> {
  return new Promise((resolve, reject) =>
    require("../../config/config")
      .store.get(`/catalog/products/${product_id}/reviews/${review_id}`)
      .then((response: any) => resolve(response.data.data as Review))
      .catch(reject)
  );
}
