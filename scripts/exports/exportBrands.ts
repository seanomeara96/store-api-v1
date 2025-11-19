import { getAllBrands } from "../../functions/brands/getAllBrands";
import {getAllProducts} from "../../functions/products/getAllProducts"
import { output } from "../utils/output";
import path from "path";
const store = "ih";
async function exportCategories() {
  try {
    require("../../config/config").config(store);
    let brands = await getAllBrands();
    let products =  await getAllProducts()



    const exportdata = brands.map((c) => ({
      id: c.id,
      name: c.name,
      page_title: c.page_title,
      meta_description: c.meta_description,
      url: c.custom_url.url,
      product_count: products.filter(p => p.brand_id === c.id).length
    }));

    await output(
      path.resolve(__dirname, store + "-brand-export.csv"),
      exportdata,
      true
    );

    console.log("And done");
  } catch (err) {
    console.log("Failure to launch", err);
  }
}

exportCategories();
