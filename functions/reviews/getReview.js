const getReview = (product_id, review_id) =>
  new Promise((resolve, reject) =>
    require("../../config/config")
      .store.get(`/catalog/products/${product_id}/reviews/${review_id}`)
      .then(({data}) => resolve(data.data))
      .catch(reject)
  );


exports.getReview = getReview;