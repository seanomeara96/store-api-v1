import { getAllProducts } from "../../functions/products/getAllProducts";
import { getAllReviews } from "../../functions/reviews/getAllReviews";
import { deleteReview } from "../../functions/reviews/deleteReview";
require("../../config/config").config("px");

async function main() {
  const products = await getAllProducts();
  for (const [index, product] of products.entries()) {
    console.log(`product ${index + 1} of ${products.length}`);
    try {
      if (index % 5 === 0)
        await new Promise((resolve) => setTimeout(resolve, 300));
      const reviews = await getAllReviews(product.id);
      for (const review of reviews) {
        try {
          await new Promise((resolve) => setTimeout(resolve, 300));
          await deleteReview(product.id, review.id!);
        } catch {
          console.log(
            `error deleting review ${review.id} of product ${product.id}`,
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
