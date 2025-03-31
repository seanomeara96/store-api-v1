import { getAllCategories } from "./functions/categories/getAllCategories";
import { updateCategory } from "./functions/categories/updateCategory";

async function test() {
  try {
    require("./config/config").config("ch");
    const catgeories = await getAllCategories();
    for (const cat of catgeories) {
      await updateCategory(cat.id, {
        default_product_sort: "use_store_settings",
      });
    }
  } catch (err: any) {
    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err);
    }
  }
}
test();
