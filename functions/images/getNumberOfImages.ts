import { getAllProductImages } from "./getAllProductImages";
/**
 * returns the number of images a product has
 * @param { number } product_id
 * @returns
 */
export function getNumberOfImages(product_id: number): Promise<{
  product_id: number;
  "#images": number;
}> {
  return new Promise(async function (resolve, reject) {
    try {
      const images = await getAllProductImages(product_id);
      resolve({
        product_id,
        "#images": images.length,
      });
    } catch (err) {
      reject(err);
    }
  });
}
