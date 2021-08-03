const { getAllProductImages } = require("./getAllProductImages");
const getFirstProductImage = (product_id) => {
  return new Promise((resolve, reject) => {
    getAllProductImages(product_id)
      .then((images) =>
        resolve(images.filter((image) => image.sort_order === 0))
      )
      .catch(reject);
  });
};
exports.getFirstProductImage = getFirstProductImage;
