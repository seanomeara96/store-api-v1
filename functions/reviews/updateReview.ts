import { Review, ReviewUpdateParams } from "./Review";

export function updateReview(
  product_id: number,
  review_id: number,
  updatedFields: ReviewUpdateParams
): Promise<Review> {
  return new Promise(function (resolve, reject) {
    require("../../config/config")
      .store.put(`/catalog/products/${product_id}/reviews/${review_id}`, {
        ...updatedFields,
      })
      .then((response: any) => resolve(response.data.data as Review))
      .catch(reject);
  });
}

export function updateReviewName(
  product_id: number,
  review_id: number,
  name: string
): Promise<Review> {
  return new Promise(async function (resolve, reject) {
    try {
      resolve(await updateReview(product_id, review_id, { name }));
    } catch (err) {
      reject(err);
    }
  });
}
