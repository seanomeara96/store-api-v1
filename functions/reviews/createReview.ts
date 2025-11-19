import { Review, ReviewCreateParams } from "./Review";

export async function createReview(
  product_id: number,
  params: ReviewCreateParams,
): Promise<Review> {
  try {
    const res = await require("../../config/config").store.post(
      `/catalog/products/${product_id}/reviews`,
      params,
    );
    return res.data.data as Review;
  } catch (err) {
    throw err;
  }
}
