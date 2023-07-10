export function deleteReview(
  product_id: number,
  review_id: number
): Promise<undefined> {
  return new Promise(async function (resolve, reject) {
    try {
      await require("../../config/config").store.delete(
        `/catalog/products/${product_id}/reviews/${review_id}`
      );
      resolve(undefined);
    } catch (err) {
      reject(err);
    }
  });
}
