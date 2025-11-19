import { AxiosResponse } from "axios";
import { Review } from "./Review";

/**
 * get all reviews of a product byu id
 * @param {number} product_id
 * @returns
 */
export async function getAllReviews(product_id: number): Promise<Review[]> {
  try {
    const response = await require("../../config/config").store.get(
      `/catalog/products/${product_id}/reviews`,
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
}
