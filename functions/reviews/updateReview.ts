import { Review, ReviewUpdateParams } from "./Review";

export async function updateReview(
  product_id: number,
  review_id: number,
  updatedFields: ReviewUpdateParams,
): Promise<Review> {
  try {
    const response: any = await require("../../config/config").store.put(
      `/catalog/products/${product_id}/reviews/${review_id}`,
      { ...updatedFields },
    );
    return response.data.data as Review;
  } catch (err) {
    throw err;
  }
}

export async function updateReviewName(
  product_id: number,
  review_id: number,
  name: string,
): Promise<Review> {
  return updateReview(product_id, review_id, { name });
}
