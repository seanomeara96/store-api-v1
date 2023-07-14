require("../config/config").config("bf");
import { getProductsByBrand } from "../products/getProductsByBrand";
import { updateSearchKeywords } from "./updateSearchKeywords";
export function updateSearchKeywordsByBrand (
  brandName: string,
  searchKeywordsToAdd: string[]
) {
  return new Promise((resolve, reject) => {
    getProductsByBrand(brandName)
      .then((products) => {
        let promises = [];
        for (const product of products) {
          promises.push(updateSearchKeywords(product.id, searchKeywordsToAdd));
        }
        Promise.allSettled(promises).then(resolve).catch(reject);
      })
      .catch(reject);
  });
};

