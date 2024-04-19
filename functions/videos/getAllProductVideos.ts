import { ProductVideo } from "../../newclient/products/videos";

export function getAllProductVideos(product_id: number): Promise<ProductVideo> {
  return new Promise(async function (resolve, reject) {
    try {
      if (typeof product_id !== "number") reject("product id must be a number");
      const res = await require("../../config/config").store.get(
        `/catalog/products/${product_id}/videos`
      );
      resolve(res.data.data);
    } catch (err) {
      reject(err);
    }
  });
}

