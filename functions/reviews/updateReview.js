const updateReview = (product_id, review_id, updatedFields) =>
  new Promise((resolve, reject) => {
    require("../../config/config")
      .store.put(`/catalog/products/${product_id}/reviews/${review_id}`, {
        ...updatedFields,
      })
      .then(({data}) => resolve(data.data))
      .catch(reject);
  });

exports.updateReview = updateReview;

const updateReviewName = (product_id, review_id, name) =>
  new Promise((resolve, reject) => {
    updateReview(product_id, review_id, { name }).then(resolve).catch(reject);
  });

exports.updateReviewName = updateReviewName;