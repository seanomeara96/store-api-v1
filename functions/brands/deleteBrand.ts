import { getBrandById } from "../brands/getBrandById";
import { createRedirect } from "../redirects/createRedirect";
import { Brand } from "./Brand";

const createRelevantRedirect = (brand: Brand) =>
  new Promise(async (resolve, reject) => {
    if (!brand) return reject("creating redirect requires brand object");
    const res = await createRedirect(brand.custom_url.url, "/brands/").catch(
      reject
    );
    return resolve(res);
  });

export function deleteBrand(id: number) {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await getBrandById(id);

      await require("../../config/config").store.delete(
        `/catalog/brands/${brand.id}`
      );

      await createRelevantRedirect(brand);

      resolve(`Successfully deleted ${brand.name}`);
    } catch (err) {
      reject(err);
    }
  });
}
