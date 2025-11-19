const store = "bf";
require("./config/config").config(store);
import { output } from "../../scripts/utils/output";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getAllRedirects } from "../../functions/redirects/getAllRedirects";

async function main() {
  try {
    const products = await getAllProducts();

    const inStock = products.filter(function (product) {
      return product.inventory_level;
    });

    const redirects = await getAllRedirects();

    const redirectedUrls = redirects.map(function (redirect) {
      return redirect.from_path;
    });

    const instockButRedirected = inStock.filter(function (product) {
      return redirectedUrls.includes(product.custom_url.url);
    });

    const content = instockButRedirected.map(function (product) {
      return {
        id: product.id,
        name: product.name,
        is_visible: product.is_visible ? "TRUE" : "FALSE",
        inventory_level: product.inventory_level,
        url: product.custom_url.url,
      };
    });

    output(store + "-redirected-products", content, true);
  } catch (err) {
    console.log(err);
  }
}

main();
