require("../config/config").config("bf");
import { getProductsByBrand } from "../products/getProductsByBrand";
import { updateSearchKeywords } from "./updateSearchKeywords";
export async function updateSearchKeywordsByBrand(
  brandName: string,
  searchKeywordsToAdd: string[],
) {
  try {
    const products = await getProductsByBrand(brandName);
    const promises = products.map((product) =>
      updateSearchKeywords(product.id, searchKeywordsToAdd),
    );
    await Promise.allSettled(promises);
  } catch (error) {
    throw error;
  }
}
