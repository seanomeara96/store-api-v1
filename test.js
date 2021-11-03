require("./config/config").config("ih");
const { getAllProducts } = require("./functions/products/getAllProducts");
const { getAllReviews } = require("./functions/reviews/getAllReviews");

async function main() {
  const products = await getAllProducts().catch(console.log);
  const productReviews = await Promise.allSettled(
    products.map((id) => getAllReviews(id))
  ).catch(console.log);
  console.log(productReviews);
}
main();
