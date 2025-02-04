import { getAllBrands } from "../../functions/brands/getAllBrands";
import { output } from "../utils/output";
import path from "path";
const store = "ha";
async function exportCategories() {
  try {
    require("../../config/config").config(store);
    let brands = await getAllBrands();

    brands = brands.filter(
        (b) => !b.page_title.length || !b.meta_description.length
      )

    const exportdata = brands.map((c) => ({
      id: c.id,
      name: c.name,
      page_title: c.page_title,
      meta_description: c.meta_description,
      url: c.custom_url.url,
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
