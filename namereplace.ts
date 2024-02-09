import { getAllProducts } from "./functions/products/getAllProducts";
import { ReviewUpdateParams } from "./functions/reviews/Review";
import { getAllReviews } from "./functions/reviews/getAllReviews";
import { updateReview } from "./functions/reviews/updateReview";
require("./config/config").config("px");

function wait() {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1000);
  });
}

let count = 0;
async function nameReplace() {
  try {
    const pattern = /[B,b]eauty\s?[F,f]eatures/g;
    const products = await getAllProducts();
    for (let i = 0; i < products.length; i++) {
      console.log(
        `Updating reviews for product ${i + 1} of ${products.length}`
      );
      const product = products[i];

      try {
        const reviews = await getAllReviews(product.id);
        for (let ii = 0; ii < reviews.length; ii++) {
          const review = reviews[ii];
          const titleMentionsBF = review.title.match(pattern);
          const textMentionsBF = review.text?.match(pattern);
          if (titleMentionsBF || textMentionsBF) {
            count++;
            const params: ReviewUpdateParams = {
              title: review.title.replace(pattern, "Pixie Loves"),
              text: review.text?.replace(pattern, "Pixie Loves"),
            };
            if (!review.id) {
              throw new Error("review has no id");
            }
            try {
              await updateReview(product.id, review.id, params);
              console.log(`${count} reviews updated`);
            } catch (err: any) {
              if (err.response.status) {
                ii--;
                await wait();
              } else {
                throw err;
              }
            }
          }
        }
      } catch (err: any) {
        if (err.response.status === 429) {
          i--;
          await wait();
        } else {
          throw err;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

nameReplace();
