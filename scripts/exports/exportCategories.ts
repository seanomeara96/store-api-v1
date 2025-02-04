
import { getAllCategories } from "../../functions/categories/getAllCategories";
import { output } from "../utils/output";
import path from "path";
const store = "ch"
async function exportCategories() {
  try {
    require("../../config/config").config(store);
    let categories = await getAllCategories();

    console.log(categories.filter(c => c.is_visible && (!c.page_title.length || !c.meta_description.length)).length)


    // const exportdata = categories.map((c) => ({
    //   id: c.id,
    //   parent_id: c.parent_id,
    //   name: c.name,
    //   sort_order: c.sort_order,
    //   page_title: c.page_title,
    //   meta_description: c.meta_description,
    //   url: c.custom_url.url,
    // }));

    // await output(
    //   path.resolve(__dirname, store+"-category-export.csv"),
    //   exportdata,
    //   true
    // );

    console.log("And done");
  } catch (err) {
    console.log("Failure to launch", err);
  }
}

exportCategories();
