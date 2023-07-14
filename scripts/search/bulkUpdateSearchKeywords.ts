require("../config/config").config("bf");
import { updateSearchKeywords } from "../../functions/search/updateSearchKeywords";

export function bulkUpdateSearchKeywords(productIds:{[key: string]: number}[], searchKeywordsToAdd: string[]) {
  return new Promise((resolve, reject) => {
    let promises = [];
    let productIdsArray = productIds.map((obj) => obj);
    for (const product of productIdsArray) {
      promises.push(updateSearchKeywords(product[Object.keys(product)[0]], searchKeywordsToAdd));
    }
    Promise.allSettled(promises).then(resolve).catch(reject);
  });
}
