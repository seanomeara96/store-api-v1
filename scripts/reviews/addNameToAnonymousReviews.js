require("./config/config").config("bsk");

// trybing to get reviews per product

const { getAllProducts } = require("../../functions/products/getAllProducts");
const { getAllReviews } = require("../../functions/reviews/getAllReviews");
const { updateReviewName } = require("../../functions/reviews/updateReview");
/**
 * @param {string[]} names array of names to choose from
 * @returns an random name from an array
 */
const randomName = (
  names = [
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
  ]
) => names[Math.floor(Math.random() * names.length)];
/**
 * Promise all settled reponse filter for fulfilled
 * @param {string} param0 
 * @returns 
 */
const fulfilledStatuses = ({ status }) => status === "fulfilled";
/**
 * Map value to position in array, essentially removing status
 * @param {any} param0 
 * @returns 
 */
const promiseValues = ({ value }) => value;
const pullProductReviewsFromResponses = (productReviewsResponses) =>
  productReviewsResponses.filter(fulfilledStatuses).map(promiseValues);

const getAllProductReviews = () =>
  new Promise(async (resolve, reject) => {
    try {
      const products = await getAllProducts().catch(console.log);
      const reviewRequests = products.map(({ id }) => getAllReviews(id));
      const productReviewsResponses = await Promise.allSettled(
        reviewRequests
      ).catch((err) => console.log(err));
      const productReviews = pullProductReviewsFromResponses(
        productReviewsResponses
      );
      resolve(productReviews);
    } catch (err) {
      reject(err);
    }
  });
/**
 * filters products that have reviews
 * @param {object} param0 object with reviews array
 * @returns
 */
const productsWithReviews = ({ reviews }) => reviews.length;
/**
 * filter reviews that have an empty name string
 * @param {object[]} review
 * @returns
 */
const reviewsWithNoName = (review) => !review.name.length;
/**
 * returns products array with reviews that have an empty name
 * @param {object} param0 object with product id and reviews array
 * @returns
 */
const productsWithNoNameReviews = ({ product_id, reviews }) => ({
  product_id,
  reviews: reviews.filter(reviewsWithNoName),
});

const filterNoNameReviews = (productReviews) =>
  productReviews
    .filter(productsWithReviews) // remove products with no reviews
    .map(productsWithNoNameReviews) // filter for reviews that have no name
    .filter(productsWithReviews); // remove empty review arrays

async function addNameToAnonymousReviews() {
  const productReviews = await getAllProductReviews();
  const noNameReviews = filterNoNameReviews(productReviews);
  const nameUpdateRequests = [];
  noNameReviews.forEach(({ product_id, reviews }) => {
    reviews.forEach(({ id }) =>
      nameUpdateRequests.push(updateReviewName(product_id, id, randomName()))
    );
  });
  const nameUpdateResponses = await Promise.allSettled(
    nameUpdateRequests
  ).catch((err) => console.log(err));
  console.log("nameUpdateResponses", nameUpdateResponses.length);
  const updatedProductReviews = await getAllProductReviews();
  const updatedNoNameReviews = filterNoNameReviews(updatedProductReviews);
  console.log("updatedNoNameReviews", updatedNoNameReviews);
}

addNameToAnonymousReviews();
