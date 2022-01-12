const { getAllCategories } = require("./functions/categories/getAllCategories");
const { getAllProducts } = require("./functions/products/getAllProducts");
const { getSiteUrl } = require("./functions/utils/getSiteUrl");
const { output } = require("./scripts/utils/output");
const store = "ah";
require("./config/config").config(store);

async function main() {
  const data = [];
  const baseUrl = getSiteUrl(store);
  const categories = await getAllCategories().catch(console.log);
  const products = await getAllProducts().catch(console.log);

  categories.forEach((category) => {
    const productsInCategory = products.filter(({ categories }) =>
      categories.includes(category.id)
    );
    productsInCategory.forEach((product) => {
      const row = {
        "Category Name": category.name,
        "Category URL": baseUrl + category.custom_url.url,
        "Product Name": product.name,
        "Product SKU": product.sku,
        "Product URL": product.custom_url.url
      };
      data.push(row);
    });
  });

  await output(`${store}-category-products`, data).catch(console.log)
}

main();
