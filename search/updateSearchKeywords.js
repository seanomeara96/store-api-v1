const { updateProduct } = require("../products/updateProduct");
const { getProductById } = require("../products/getProductById");

const updateSearchKeywords = (productId, searchKeywordsToAdd) => {
  return new Promise((resolve, reject) => {
    if (typeof productId !== "number")
      return reject("productId must be a number");
    if (!Array.isArray(searchKeywordsToAdd))
      return reject("you must supply an array of search keywords to add");
    // better to get pre-existing search kewords and add to them
    getProductById(productId)
      .then((res) => {
        let preExistingSearchKeywordsString = res.search_keywords;
        let preExistingSearchKeywordsArray = preExistingSearchKeywordsString
          .split(",")
          .map((i) => i.trim());
        let newSearchKeywordsAddedToPreExistingKeywords = [
          ...preExistingSearchKeywordsArray,
          ...searchKeywordsToAdd,
        ];
        let updatedSearchKeywordsArray = new Set(
          newSearchKeywordsAddedToPreExistingKeywords
        );
        let updatedSearchKeywords = [...updatedSearchKeywordsArray].join(", ");
        updateProduct(productId, { search_keywords: updatedSearchKeywords })
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
};

exports.updateSearchKeywords = updateSearchKeywords;
