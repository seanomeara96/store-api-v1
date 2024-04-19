import { fstat } from "fs";
import { getAllCategories } from "../../functions/categories/getAllCategories";
import { output } from "../utils/output";
import path from "path";
import fs from "fs";
async function exportCategories() {
  try {
    require("../../config/config").config("ch");
    let categories = await getAllCategories();

    categories = categories.filter(function (cat) {
      return cat.is_visible && cat.id !== 295;
    });

    for (const cat of categories) {
      if (cat.parent_id === 295) cat.parent_id = 0;
      if (cat.name.includes(" Hire")) cat.name = cat.name.replace(" Hire", "")
    }

    const exportdata = categories.map(c => ({id: c.id, parent_id: c.parent_id, name: c.name, sort_order: c.sort_order}))

    fs.writeFileSync(
      path.resolve(__dirname, "category-export.json"),
      JSON.stringify(exportdata),
      { encoding: "utf-8" }
    );

    console.log("And done");
  } catch (err) {
    console.log("Failure to launch", err);
  }
}

exportCategories();
