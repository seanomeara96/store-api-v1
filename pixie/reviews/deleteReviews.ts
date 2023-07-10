import { Database } from "sqlite3";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getAllReviews } from "../../functions/reviews/getAllReviews";
import { deleteReview } from "../../functions/reviews/deleteReview";
require("../../config/config").config("px");
async function main() {
  const products = await getAllProducts();
  for (let i = 0; i < products.length; i++) {
    console.log(`product ${i + 1} of ${products.length}`);
    try {
      const product = products[i];
      if (i % 5 === 0) await new Promise((resolve) => setTimeout(resolve, 300));
      const reviews = await getAllReviews(product.id);
      for (let ii = 0; ii < reviews.length; ii++) {
        const review = reviews[ii];
        try {
          await new Promise((resolve) => setTimeout(resolve, 300));
          await deleteReview(product.id, review.id!);
        } catch {
          console.log(
            `error deleting review ${review.id} of poduct ${product.id}`
          );
          continue;
        }
      }
    } catch (err) {
      console.log(err);
      continue;
    }
  }
}
main();
