const getAllProductVariants = (productId) => {
  return new Promise((resolve, reject) => {
    require("../config/config")
      .store.get(`/catalog/products/${productId}/variants`)
      .then(({ data }) => resolve(data.data))
      .catch((err)=>{console.log(err);reject("could not get product variants")});
  });
};
exports.getAllProductVariants = getAllProductVariants