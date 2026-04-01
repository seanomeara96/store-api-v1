import { htmlToText } from "html-to-text";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getAllCategories } from "../../functions/categories/getAllCategories";
import fs from "fs";
import path from "path";
import { getAllProductImages } from "../../functions/images/getAllProductImages";

async function main() {
  try {
    let store = "ch";
    let baseURL = "https://beautyfeatures.ie";
    if (store === "ch") baseURL = "https://caterhire.ie";
    require("../../config/config").config(store);

    const categories = await getAllCategories();

    const catMap: { [key: number]: string } = {};
    for (const c of categories) if (c.parent_id == 0) catMap[c.id] = c.name;

    const mapIDToName = function (catIDs: number[]): string[] {
      let out: string[] = [];
      for (let id of catIDs) if (catMap[id]) out.push(catMap[id]);
      return out;
    };

    const products = (
      await getAllProducts({ "categories:in": [34, 138].join(",") })
    )
      .filter((p) => p.is_visible && p.inventory_level > 0)
      .sort((a, b) => a.sort_order - b.sort_order)
      .slice(0, 100);
    let out: any[] = [];
    for (const p of products) {
      const images = await getAllProductImages(p.id);
      const thumbnail = images.find((img) => img.is_thumbnail) || images[0];
      out.push({
        name: p.name,
        description: htmlToText(p.description).slice(0, 500),
        categories: mapIDToName(p.categories).join(" | "),
        price: p.price,
        sale_price: p.sale_price > 0 ? p.sale_price : p.price,
        url: baseURL + p.custom_url.url,
        image_url: thumbnail.url_standard,
      });
    }

    fs.writeFileSync(
      path.resolve(__dirname, "catalog-context-" + store + ".json"),
      JSON.stringify(out),
    );
  } catch (err) {
    console.log(err);
  }
}

main();
