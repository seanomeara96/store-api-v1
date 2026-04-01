import { getAllCategories } from "../../functions/categories/getAllCategories";

require("../../config/config").config("bf");

async function find() {
  try {
    const categories = await getAllCategories();
    const cat = categories.filter((c) => {
      return (
        c &&
        c.custom_url &&
        c.custom_url.url &&
        c.custom_url.url.includes("/inforcer")
      );
    });
    console.log(cat);
  } catch (err) {
    console.log(err);
  }
}

find();
