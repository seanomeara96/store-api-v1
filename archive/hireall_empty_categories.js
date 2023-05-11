const { getAllCategories } = require("./functions/categories/getAllCategories");
const { getAllProducts } = require("./functions/products/getAllProducts");
const { getAllRedirects } = require("./functions/redirects/getAllRedirects");
const { output } = require("./scripts/utils/output");
require("./config/config").config("ch");
(async () => {
  try {
    const [categories, products, redirects] = await Promise.all([
      getAllCategories(),
      getAllProducts(),
      getAllRedirects(),
    ]);

    const from_paths = redirects.map((r) => r.from_path);

    for (const cat of categories) {
      cat.productCount = products.filter((p) =>
        p.categories.includes(cat.id)
      ).length;
    }

    const to_output = categories
      .filter((cat) => !from_paths.includes(cat.custom_url.url))
      .filter((c) => c.productCount < 1)
      .map((c) => ({
        parent_id: c.parent_id,
        id: c.id,
        name: c.name,
        "product count": c.productCount,
        "is visible": c.is_visible ? "true" : "false",
        url: "https://caterhire.ie" + c.custom_url.url,
      }));

    output("ch-emptycategories", to_output);
  } catch (err) {
    console.log(err);
  }
})();
