const store = "bf";
require("./config/config").config(store);
const { output } = require("./scripts/utils/output");
const { getAllProducts } = require("./functions/products/getAllProducts");
const { getAllRedirects } = require("./functions/redirects/getAllRedirects");

async function main() {
  try {
    const products = await getAllProducts();

    const inStock = products.filter((p) => p.inventory_level);

    const redirects = await getAllRedirects();

    const redirectedUrls = redirects.map((r) => r.from_path);

    const instockButRedirected = inStock.filter((p) =>
      redirectedUrls.includes(p.custom_url.url)
    );

    const content = instockButRedirected.map((p) => ({
      id: p.id,
      name: p.name,
      is_visible: p.is_visible ? "TRUE" : "FALSE",
      inventory_level: p.inventory_level,
      url: p.custom_url.url,
    }));

    output(store + "-redirected-products", content);
  } catch (err) {
    console.log(err);
  }
};

main();
