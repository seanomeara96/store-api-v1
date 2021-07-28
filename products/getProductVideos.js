require("../config/config").config("ih")
const getProductVideos = (product_id) => {
  return new Promise((resolve, reject) => {
    require("../config/config")
      .store.get(`/catalog/products/${product_id}/videos`)
      .then((res) => resolve(res.data.data))
      .catch((err) => reject(err));
  });
}
getProductVideos(3926).then(res => console.log(res))
exports.getProductVideos = getProductVideos;