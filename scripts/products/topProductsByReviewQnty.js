require("../../config/config").config("bsk");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const { getAllReviews } = require("../../functions/reviews/getAllReviews");

function topProductsByReviewQnty () {
    getAllProducts().then(async (products) => {
        let promises = [];
      
        products.forEach((product) => {
          promises.push(getAllReviews(product.id));
        });
      
        const responses = await Promise.allSettled(promises);
      
        const resolvedPromises = responses
          .filter((response) => response.status === "fulfilled")
          .map(({ value }) => value);
      
        resolvedPromises.forEach((promise) => {
          const matchingProduct = products.find((i) => i.id === promise.product_id);
          if (!matchingProduct) return;
          matchingProduct.reviews = promise.reviews;
          matchingProduct.reviewsCount = promise.reviews.length;
        });
      
        products.sort((a,b)=>{b.reviewsCount - a.reviewsCount})
      
        const topProducts = products.slice(0,20)
        topProducts.forEach(({name, sku}) => console.log(name, sku))
      });
      
}
topProductsByReviewQnty()