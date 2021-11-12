require("../../config/config").config("bsk");

// trying to get reviews per product

const { getAllProducts } = require("../../functions/products/getAllProducts");
const { getAllReviews } = require("../../functions/reviews/getAllReviews");
const { updateReviewName } = require("../../functions/reviews/updateReview");
/**
 * @param {string[]} names array of 24 names to choose from
 * @returns an random name from an array
 */
const randomName = () =>
  [
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
  ][Math.floor(Math.random() * 24)];
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
/**
 * When promise.allsettled has resolved we want to map the revews for the fulfilled promises
 * @param {*} productReviewsResponses
 * @returns
 */
const pullProductReviewsFromResponses = (productReviewsResponses) =>
  productReviewsResponses.filter(fulfilledStatuses).map(promiseValues);

const mapReviewRequestToProducts = (products) =>
  products.map(({ id }) => getAllReviews(id));

const fetchProductReviews = async (reviewRequests) => {
  const productReviewsResponses = await Promise.allSettled(
    reviewRequests
  ).catch((err) => console.log(err));
  return pullProductReviewsFromResponses(productReviewsResponses);
};

const getAllProductReviews = () =>
  new Promise((resolve, reject) =>
    getAllProducts()
      .then(mapReviewRequestToProducts)
      .then(fetchProductReviews)
      .then(resolve)
      .catch(reject)
  );
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
/**
 * filter for reviews where the name field is empty
 * @param {object[]} productReviews
 * @returns
 */
const filterNoNameReviews = (productReviews) =>
  productReviews
    .filter(productsWithReviews) // remove products with no reviews
    .map(productsWithNoNameReviews) // filter for reviews that have no name
    .filter(productsWithReviews); // remove empty review arrays

async function addNameToAnonymousReviews() {
  const productReviews = await getAllProductReviews();
  console.log(productReviews)
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
