require("./config/config").config("fs");


// trybing to get reviews per product

const { getAllProducts } = require("./functions/products/getAllProducts");
const { getAllReviews } = require("./functions/reviews/getAllReviews");
const { getReview } = require("./functions/reviews/getReview");

async function main() {
  //const products = await getAllProducts().catch(console.log);
  //console.log(products)
  //const productReviews = await getAllReviews(100275).catch(err => console.log(err))
  const review = await getReview(133, 549).catch(console.log)
  /**
   * Promise.allSettled(
    products.map((id) => getAllReviews(id))
  )
   */
  console.log(review);
}
main();
