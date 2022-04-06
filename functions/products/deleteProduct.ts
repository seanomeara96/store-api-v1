import { getBrandById } from "../brands/getBrandById";
import { createRedirect } from "../redirects/createRedirect";
import { getProductById } from "./getProductById";

const createRelevantRedirect = (product: any) =>
  new Promise(async (resolve, reject) => {
    if (!product) return reject("creating redirect requires product object");
    if (product.brand_id) {
      const brand = await getBrandById(product.brand_id).catch(reject);
      const res = await createRedirect(
        product.custom_url.url,
        brand.custom_url.url
      ).catch(reject);
      return resolve(res);
    }
    const res = await createRedirect(product.custom_url.url, "/").catch(reject);
    return resolve(res);
  });

export const deleteProduct = (id: number) =>
  new Promise(async (resolve, reject) => {
    getProductById(id)
      .then((product: any) => {
        require("../../config/config")
          .store.delete(`/catalog/products/${id}`)
          .then(() => {
            createRelevantRedirect(product)
              .then(() => resolve(`Successfully deleted ${product.name}`))
              .catch(reject);
          })
          .catch(reject);
      })
      .catch(reject);
  });
