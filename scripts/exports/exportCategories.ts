import { fstat } from "fs";
import { getAllCategories } from "../../functions/categories/getAllCategories";
import { output } from "../utils/output";
import path from "path";
import fs from "fs";
async function exportCategories() {
  try {
    require("../../config/config").config("px");
    let categories = await getAllCategories();

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
