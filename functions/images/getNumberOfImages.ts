import { getAllProductImages } from "./getAllProductImages";
/**
 * returns the number of images a product has
 * @param {number} product_id
 * @returns
 */
export const getNumberOfImages = (product_id: number) =>
  new Promise((resolve, reject) => {
    getAllProductImages(product_id)
      .then(({images}) =>
        resolve({
          product_id,
          "#images": images.length,
        })
      )
      .catch(reject);
  });

