import { Review, ReviewCreateParams } from "./Review";

export function createReview(
  product_id: number,
  params: ReviewCreateParams
): Promise<Review> {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.post(
        `/catalog/products/${product_id}/reviews`,
        params
      );
      resolve(res.data.data as Review);
    } catch (err) {
      reject(err);
    }
  });
}
