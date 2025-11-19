import { updateProduct } from "../products/updateProduct";
import { getProductById } from "../products/getProductById";

export async function updateSearchKeywords(
  productId: number,
  searchKeywordsToAdd: string[],
) {
  if (typeof productId !== "number") {
    throw new Error("productId must be a number");
  }
  if (!Array.isArray(searchKeywordsToAdd)) {
    throw new Error("you must supply an array of search keywords to add");
  }

  try {
    const res = await getProductById(productId);
    let preExistingSearchKeywordsString = res.search_keywords;
    let preExistingSearchKeywordsArray = preExistingSearchKeywordsString
      .split(",")
      .map((i) => i.trim());
    let newSearchKeywordsAddedToPreExistingKeywords = [
      ...preExistingSearchKeywordsArray,
      ...searchKeywordsToAdd,
    ];
    let updatedSearchKeywordsArray = new Set(
      newSearchKeywordsAddedToPreExistingKeywords,
    );
    let updatedSearchKeywords = [...updatedSearchKeywordsArray].join(", ");
    await updateProduct(productId, { search_keywords: updatedSearchKeywords });
  } catch (error) {
    throw error;
  }
}
