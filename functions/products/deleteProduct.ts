import { getBrandById } from "../brands/getBrandById";
import { createRedirect } from "../redirects/createRedirect";
import { getProductById } from "./getProductById";

const createRelevantRedirect = (
  product: any,
  custom_redirect?: string | undefined
) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!product) {
        throw "creating redirect requires product object";
      }

      if (custom_redirect) {
        const res = await createRedirect(
          product.custom_url.url,
          custom_redirect
        );
        return resolve(res);
      }

      if (product.brand_id) {
        const brand = await getBrandById(product.brand_id);
        const res = await createRedirect(
          product.custom_url.url,
          brand.custom_url.url
        );
        return resolve(res);
      }
      const res = await createRedirect(product.custom_url.url, "/");
      return resolve(res);
    } catch (err) {
      reject(err);
    }
  });

export const deleteProduct = (id: number, url: string | undefined) =>
  new Promise(async (resolve, reject) => {
    getProductById(id)
      .then((product: any) => {
        require("../../config/config")
          .store.delete(`/catalog/products/${id}`)
          .then(() => {
            createRelevantRedirect(product, url)
              .then(() => resolve(`Successfully deleted ${product.name}`))
              .catch(reject);
          })
          .catch(reject);
      })
      .catch(reject);
  });
