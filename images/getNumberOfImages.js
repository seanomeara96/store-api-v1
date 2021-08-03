const { getAllProductImages } = require("./getAllProductImages");
const getNumberOfImages = (product_id) => {
  return new Promise((resolve, reject) => {
    getAllProductImages(product_id)
      .then((images) =>
        resolve({
          product_id,
          "#images": images.length,
        })
      )
      .catch(reject);
  });
};
exports.getNumberOfImages = getNumberOfImages;
