const getAllProductVideos = (product_id) => {
  return new Promise((resolve, reject) => {
    if (typeof product_id !== "number") reject("product id must be a number");
    require("../config/config")
      .store.get(`/catalog/products/${product_id}/videos`)
      .then((res) => resolve({product_id, videos: res.data.data}))
      .catch((err) => reject(err));
  });
};
exports.getAllProductVideos = getAllProductVideos;
