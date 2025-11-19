import { getAllCategories } from "../../functions/categories/getAllCategories";
import { output } from "../utils/output";
import path from "path";
const store = "ah";
async function exportCategories() {
  try {
    require("../../config/config").config(store);
    let categories = await getAllCategories();

    const exportdata = [];
    for (let i = 0; i < categories.length; i++) {
      let c = categories[i];
      let name = c.name;
      let parent = categories.find(function (p) {
        return p.id == c.parent_id;
      });
      while (parent) {
        name = parent.name + " => " + name;
        parent = categories.find(function (p) {
          return p.id == parent!.parent_id;
        });
      }

      exportdata.push({
        id: c.id,
        // parent_id: c.parent_id,
        name: name,
        //sort_order: c.sort_order,
        //page_title: c.page_title,
        meta_description: c.meta_description,
        //url: c.custom_url.url,
      });
    }

    await output(
      path.resolve(__dirname, store + "-category-export.csv"),
      exportdata,
      true,
    );

    console.log("And done");
  } catch (err) {
    console.log("Failure to launch", err);
  }
}

exportCategories();
