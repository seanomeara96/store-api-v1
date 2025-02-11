import { getAllPages } from "../../functions/pages/getAllPages";
import { output } from "../utils/output";
import path from "path";
const store = "ha";
async function exportCategories() {
  try {
    require("../../config/config").config(store);
    let pages = await getAllPages();

    pages = pages.filter(
      (b) =>
        b.is_visible &&
        ((typeof b.meta_title !== "undefined" && !b.meta_title.length) ||
          (typeof b.meta_description !== "undefined" &&
            !b.meta_description.length))
    );

    const exportdata = pages.map((c) => ({
      id: c.id,
      name: c.name,
      page_title: c.meta_title,
      meta_description: c.meta_description,
      url: c.url,
    }));

    await output(
      path.resolve(__dirname, store + "-page-export.csv"),
      exportdata,
      true
    );

    console.log("And done");
  } catch (err) {
    console.log("Failure to launch", err);
  }
}

exportCategories();
