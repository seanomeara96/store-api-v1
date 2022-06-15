import { getBrandById } from "../brands/getBrandById";
import { createRedirect } from "../redirects/createRedirect";

interface brand {
  id: number;
  name: string;
  meta_keywords: string[];
  meta_description: string;
  image_url: string;
  search_keywords: string;
  custom_url: {
    url: string;
    is_customized: boolean;
  };
}

const createRelevantRedirect = (brand: brand) =>
  new Promise(async (resolve, reject) => {
    if (!brand) return reject("creating redirect requires brand object");
    const res = await createRedirect(brand.custom_url.url, "/brands/").catch(
      reject
    );
    return resolve(res);
  });

export const deleteBrand = (id: number) =>
  new Promise(async (resolve, reject) => {
    getBrandById(id)
      .then((brand: brand) => {
        require("../../config/config")
          .store.delete(`/catalog/products/${id}`)
          .then(() => {
            createRelevantRedirect(brand)
              .then(() => resolve(`Successfully deleted ${brand.name}`))
              .catch(reject);
          })
          .catch(reject);
      })
      .catch(reject);
  });
