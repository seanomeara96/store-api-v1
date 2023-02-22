const { getAllProducts } = require("./functions/products/getAllProducts");
const { output } = require("./scripts/utils/output");
require("./config/config").config("bf");

function matchYears(string) {
  return string.match(/2020|2021|2022/g);
}

(async function () {
  const products = await getAllProducts();
  const productsToAddress = [];

  for (const product of products) {
    const yearInName = matchYears(product.name);
    const yearInPageTitle = matchYears(product.page_title);
    const yearInMetaDescription = matchYears(product.meta_description);
    if (yearInName || yearInPageTitle || yearInMetaDescription) {
      productsToAddress.push(product);
    }
  }

  output("years", productsToAddress)
})();
