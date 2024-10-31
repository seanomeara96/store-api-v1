import { getBrandById } from "../brands/getBrandById";
import { createRedirect } from "../redirects/createRedirect";
import { getProductById } from "./getProductById";

function createRelevantRedirect(
  product: any,
  custom_redirect?: string | undefined
): Promise<true> {
  return new Promise(async (resolve, reject) => {
    try {
      if (!product) {
        throw "creating redirect requires product object";
      }

      if (custom_redirect) {
        await createRedirect(product.custom_url.url, custom_redirect);
        return resolve(true);
      }

      if (product.brand_id) {
        const brand = await getBrandById(product.brand_id);
        await createRedirect(product.custom_url.url, brand.custom_url.url);
        return resolve(true);
      }
      await createRedirect(product.custom_url.url, "/");
      return resolve(true);
    } catch (err) {
      reject(err);
    }
  });
}

export function deleteProduct(
  id: number,
  redirect?: boolean | undefined,
  url?: string | undefined
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof redirect === "undefined") {
        redirect = true;
      }

      const product = await getProductById(id);

      if (redirect) {
        await createRelevantRedirect(product, url);
      }

      await require("../../config/config").store.delete(
        `/catalog/products/${id}`
      );

      resolve(`Successfully deleted ${product.name}`);
    } catch (err: any) {
      reject(err.data ? err.data : err);
    }
  });
}
