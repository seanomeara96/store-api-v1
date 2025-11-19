import { getAllProducts } from "../products/getAllProducts";
import { getAllProductVideos } from "./getAllProductVideos";

export async function getAllProductVideosOfAllProducts() {
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
      let productDetails = products.find(function (product) {
        return product.id === response.product_id;
      });
      if (productDetails) {
        productVideoData.push({
          name: productDetails.name,
          sku: productDetails.sku,
          url: productDetails.custom_url.url,
          ...response,
        });
      }
    }

    return productVideoData;
  } catch (err) {
    throw err;
  }
}
