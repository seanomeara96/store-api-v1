const { getAllProductImages } = require("./getAllProductImages");
/**
 * returns the number of images a product has
 * @param {number} product_id
 * @returns
 */
const getNumberOfImages = (product_id) =>
  new Promise((resolve, reject) => {
    getAllProductImages(product_id)
      .then((images) =>
        resolve({
          product_id,
          "#images": images.length,
        })
      )
      .catch(reject);
  });

// exports gteNumberOfImages
exports.getNumberOfImages = getNumberOfImages;
