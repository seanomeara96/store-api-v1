/**
 * get all reviews of a product byu id
 * @param {number} product_id
 * @returns
 */
const getAllReviews = (product_id) =>
  new Promise((resolve, reject) => {
    require("../../config/config")
      .store.get(`/catalog/products/${product_id}/reviews`)
      .then((response) =>{
        resolve({ product_id, reviews: response.data.data })
      })
      .catch(reject);
  });

exports.getAllReviews = getAllReviews;
