import { getAllProducts } from "../products/getAllProducts";
import { getAllProductVideos } from "./getAllProductVideos";

export function getAllProductVideosOfAllProducts() {
  return new Promise(async function (resolve, reject) {
    try {
      const products = await getAllProducts();
      const promises = [];
      for (const product of products) {
        promises.push(getAllProductVideos(product.id));
      }
      const responses = await Promise.allSettled(promises);

      const fulfilledResponseValues = [];
      for (const response of responses) {
        if (response.status === "fulfilled") {
          fulfilledResponseValues.push(response.value);
        }
      }

      const productVideoData = [];
      for (const response of fulfilledResponseValues) {
        let productDetails = products.find(
          (product) => product.id === response.product_id
        );
        if (productDetails) {
          productVideoData.push({
            name: productDetails.name,
            sku: productDetails.sku,
            url: productDetails.custom_url.url,
            ...response,
          });
        }
      }

      resolve(productVideoData);
    } catch (err) {
      reject(err);
    }
  });
}
