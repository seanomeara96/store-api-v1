import { getBrandIdByName } from "../brands/getBrandIdByName";
import { getAllProducts } from "./getAllProducts";
/**
 * Fetches all products by brand name, resolves with an array of objects
 * @param {string} name name of brand
 * @returns
 */
export const getProductsByBrand = (name: string) =>
  new Promise((resolve, reject) =>
    getBrandIdByName(name).then((brand_id) =>
      getAllProducts({ brand_id })
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    )
  ).catch(console.log);
