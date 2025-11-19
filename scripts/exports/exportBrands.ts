import { getAllBrands } from "../../functions/brands/getAllBrands";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { output } from "../utils/output";
import path from "path";
const store = "ih";
async function exportCategories() {
  try {
    require("../../config/config").config(store);
    let brands = await getAllBrands();
    let products = await getAllProducts();

    async function getExportData() {
      const result = [];
      for (const c of brands) {
        const productCount = products.filter(function (p) {
          return p.brand_id === c.id;
        }).length;

        result.push({
          id: c.id,
          name: c.name,
          page_title: c.page_title,
          meta_description: c.meta_description,
          url: c.custom_url.url,
          product_count: productCount,
        });
      }
      return result;
    }

    const exportdata = await getExportData();

    await output(
      path.resolve(__dirname, store + "-brand-export.csv"),
      exportdata,
      true,
    );

    console.log("And done");
  } catch (err) {
    console.log("Failure to launch", err);
  }
}

exportCategories();
