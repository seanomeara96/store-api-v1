const { getProductVideos } = require("./getProductVideos");
const getProductVideosOfMany = (productIds) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    productIds.forEach((productId) => {
      let id = productId[Object.keys(productId)[0]];
      promises.push(getProductVideos(id));
    });
    Promise.allSettled(promises)
      .then((responses) => {
        let productVideos = [];
        responses.forEach(({ value }) => {
          productVideos.push(value);
        });
        resolve(productVideos);
      })
      .catch((err) => reject(err));
  });
};
exports.getProductVideosOfMany = getProductVideosOfMany;
