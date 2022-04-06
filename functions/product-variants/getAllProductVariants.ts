const getAllProductVariants = (productId: number) => {
  return new Promise((resolve, reject) => {
    if (typeof productId !== "number") {
      return reject("product id must be a number");
    }
    require("../config/config")
      .store.get(`/catalog/products/${productId}/variants`)
      .then((res: any) => resolve(res.data.data))
      .catch((err: any) => {
        console.log(err);
        reject("could not get product variants");
      });
  });
};
exports.getAllProductVariants = getAllProductVariants;
