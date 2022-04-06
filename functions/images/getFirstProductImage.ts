import { getAllProductImages } from "./getAllProductImages";
/**
 * gets image from product by id with sort order of zero
 * @param {number} product_id
 * @returns
 */
export const getFirstProductImage = (product_id: number) =>
  new Promise((resolve, reject) => {
    getAllProductImages(product_id)
      .then(({images}) =>
        resolve(images.filter((image) => image.sort_order === 0))
      )
      .catch(reject);
  });