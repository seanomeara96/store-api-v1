import { output } from "../utils/output";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getAllRedirects } from "../../functions/redirects/getAllRedirects";
import path from "path";

async function main() {
  try {
    const store = "ch";
    require("../../config/config").config(store);

    let products = await getAllProducts();
    const redirectsData = await getAllRedirects();
    const redirects = redirectsData.map(function (r) {
      return r.from_path;
    });

    products = products.filter(function (p) {
      return p.is_visible && redirects.includes(p.custom_url.url);
    });

    const content = products.map(function (p) {
      return {
        id: p.id,
        name: p.name,
        is_visible: p.is_visible ? "TRUE" : "FALSE",
        tracking: p.inventory_tracking,
        inventory_level: p.inventory_level,
        url: p.custom_url.url,
      };
    });

    output(
      path.resolve(__dirname, store + "-redirected-products.csv"),
      content,
      true,
    );
  } catch (err) {
    console.log(err);
  }
}

main();
