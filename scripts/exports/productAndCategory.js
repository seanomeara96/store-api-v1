const {
  getAllCategories,
} = require("../../functions/categories/getAllCategories");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const { getSiteUrl } = require("../../functions/utils/getSiteUrl");
const { output } = require("../../scripts/utils/output");
const {
  getAllRedirects,
} = require("../../functions/redirects/getAllRedirects");
const store = "ih";
require("../../config/config").config(store);

async function productAndCategory() {
  const data = [];
  const baseUrl = getSiteUrl(store);
  const categories = await getAllCategories().catch(console.log);
  const products = await getAllProducts().catch(console.log);
  const redirects = await getAllRedirects().catch("redirects failed");
  const discontinuedUrls = redirects.map(({ from_path }) => from_path);
  const removeDiscontinuedUrls = (data, discontinuedUrls) =>
    data.filter((line) => !discontinuedUrls.includes(line["Product URL"]));

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
        "Product URL": product.custom_url.url,
      };
      data.push(row);
    });
  });

  await output(
    `${store}-category-products`,
    removeDiscontinuedUrls(data, discontinuedUrls).map((line) => {
      line["Product URL"] = baseUrl + line["Product URL"];
      return line;
    })
  ).catch(console.log);
}

productAndCategory();
