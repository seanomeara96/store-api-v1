import { AxiosResponse } from "axios";
import { Review } from "./Review";

/**
 * get all reviews of a product byu id
 * @param {number} product_id
 * @returns
 */
export function getAllReviews(product_id: number): Promise<Review[]> {
  return new Promise(async function (resolve, reject) {
    try {
      const response = await require("../../config/config").store.get(
        `/catalog/products/${product_id}/reviews`
      );
      resolve(response.data.data);
    } catch (err) {
      reject(err);
    }
  });
}
