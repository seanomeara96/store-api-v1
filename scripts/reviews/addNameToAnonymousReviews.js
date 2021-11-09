require("./config/config").config("bsk");

// trybing to get reviews per product

const { getAllProducts } = require("../../functions/products/getAllProducts");
const { getAllReviews } = require("../../functions/reviews/getAllReviews");
const { updateReviewName } = require("../../functions/reviews/updateReview");

const randomName = () => {
  let names = [
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
};

const pullProductReviewsFromResponses = (productReviewsResponses) =>
  productReviewsResponses
    .filter(({ status }) => status === "fulfilled")
    .map(({ value }) => value);

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

const filterNoNameReviews = (productReviews) => {
  const productsWithReviews = productReviews.filter(
    ({ reviews }) => reviews.length
  );
  return productsWithReviews
    .map(({ product_id, reviews }) => {
      return {
        product_id,
        reviews: reviews.filter((review) => !review.name.length),
      };
    })
    .filter(({ reviews }) => reviews.length);
};

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
  console.log("updatedNoNameReviews", updatedNoNameReviews)
}

addNameToAnonymousReviews();
