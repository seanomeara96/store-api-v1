require("../config/config").config("bf");
import { updateSearchKeywords } from "../../functions/search/updateSearchKeywords";

export async function bulkUpdateSearchKeywords(
  productIds: { [key: string]: number }[],
  searchKeywordsToAdd: string[],
) {
  let promises = [];
  let productIdsArray = productIds.map(function (obj) {
    return obj;
  });
  for (const product of productIdsArray) {
    promises.push(
      updateSearchKeywords(
        product[Object.keys(product)[0]],
        searchKeywordsToAdd,
      ),
    );
  }
  try {
    await Promise.allSettled(promises);
  } catch (error) {
    throw error;
  }
}
