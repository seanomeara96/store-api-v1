import { Review } from "./Review";

export async function getReview(
  product_id: number,
  review_id: number,
): Promise<Review> {
  try {
    const config = require("../../config/config");
    const response = await config.store.get(
      `/catalog/products/${product_id}/reviews/${review_id}`,
    );
    return response.data.data as Review;
  } catch (error) {
    throw error;
  }
}
