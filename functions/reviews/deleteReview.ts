export async function deleteReview(
  product_id: number,
  review_id: number,
): Promise<undefined> {
  try {
    await require("../../config/config").store.delete(
      `/catalog/products/${product_id}/reviews/${review_id}`,
    );
    return undefined;
  } catch (err) {
    throw err;
  }
}
