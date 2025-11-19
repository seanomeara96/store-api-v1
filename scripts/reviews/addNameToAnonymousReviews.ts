import { Review } from "../../functions/reviews/Review";

require("../../config/config").config("bsk");

// trying to get reviews per product

import { getAllProducts } from "../../functions/products/getAllProducts";
import { getAllReviews } from "../../functions/reviews/getAllReviews";
import { updateReviewName } from "../../functions/reviews/updateReview";
/**
 * @returns a random name from an array
 */
function randomName() {
  const names = [
    "Grace",
    "Fiadh",
    "Emily",
    "Sophie",
    "Ava",
    "Amelia",
    "Ella",
    "Hannah",
    "Lucy",
    "Mia",
    "Olivia",
    "Lily",
    "Ellie",
    "Emma",
    "Anna",
    "Eabha",
    "Chloe",
    "Sophia",
    "Molly",
    "Saoirse",
    "Sadie",
    "Evie",
    "Kate",
    "Aoife",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

/**
 * When promise.allsettled has resolved we want to map the reviews for the fulfilled promises
 * @param productReviewsResponses
 * @returns
 */
function pullProductReviewsFromResponses(productReviewsResponses: any) {
  return productReviewsResponses.filter(fulfilledStatuses).map(promiseValues);
}

function mapReviewRequestToProducts(products: any) {
  return products.map(function ({ id }: { id: any }) {
    return getAllReviews(id);
  });
}

async function fetchProductReviews(reviewRequests: any) {
  const productReviewsResponses = await Promise.allSettled(
    reviewRequests,
  ).catch((err) => console.log(err));
  return pullProductReviewsFromResponses(productReviewsResponses);
}

function getAllProductReviews() {
  return new Promise(async function (resolve, reject) {
    try {
      const products = await getAllProducts();
      const reviewRequests = mapReviewRequestToProducts(products);
      const x = fetchProductReviews(reviewRequests);
      resolve(x);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * filters products that have reviews
 * @param {object} param0 object with reviews array
 * @returns
 */
function productsWithReviews(p: any) {
  return p.reviews.length;
}

function reviewsWithNoName(review: Review) {
  return !review.name.length;
}
/**
 * returns products array with reviews that have an empty name
 * @param {object} param0 object with product id and reviews array
 * @returns
 */
function productsWithNoNameReviews({
  product_id,
  reviews,
}: {
  product_id: any;
  reviews: any;
}) {
  return {
    product_id,
    reviews: reviews.filter(reviewsWithNoName),
  };
}
/**
 * filter for reviews where the name field is empty
 * @param {object[]} productReviews
 * @returns
 */
function filterNoNameReviews(productReviews: Review[]) {
  return productReviews
    .filter(productsWithReviews) // remove products with no reviews
    .map(productsWithNoNameReviews) // filter for reviews that have no name
    .filter(productsWithReviews); // remove empty review arrays
}

async function main() {
  const productReviews = await getAllProductReviews();
  const noNameReviews = filterNoNameReviews(productReviews);
  console.log("no name reviews", noNameReviews.length);

  const review: Review = {};

  const nameUpdateRequests = [];
  for (const { product_id, reviews } of noNameReviews) {
    for (const review of reviews) {
      nameUpdateRequests.push(
        updateReviewName(product_id, review.id, randomName()),
      );
    }
  }

  console.log("name update requests", nameUpdateRequests.length);
  const nameUpdateResponses = await Promise.allSettled(nameUpdateRequests);

  console.log("nameUpdateResponses", nameUpdateResponses.length);
  const updatedProductReviews = await getAllProductReviews();
  const updatedNoNameReviews = filterNoNameReviews(updatedProductReviews);
  console.log("updatedNoNameReviews", updatedNoNameReviews);
}

main();
