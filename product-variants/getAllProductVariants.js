const getAllProductVariants = (productId) => {
  return new Promise((resolve, reject) => {
    require("../config/config")
      .store.get(`/catalog/products/${productId}/variants`)
      .then(({ data }) => resolve(data))
      .catch(reject);
  });
};
exports.getAllProductVariants = getAllProductVariants