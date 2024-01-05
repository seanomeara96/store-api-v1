const store = "bf";
require("./config/config").config(store);
import { output } from "../../scripts/utils/output";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getAllRedirects } from "../../functions/redirects/getAllRedirects";

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

    output(store + "-redirected-products", content, true);
  } catch (err) {
    console.log(err);
  }
}

main();
