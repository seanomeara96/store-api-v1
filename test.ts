import { Category } from "./functions/categories/createCategory";
import { getAllCategories } from "./functions/categories/getAllCategories";
import { addCatToProduct } from "./functions/products/addCatToProduct";
import { getAllProducts } from "./functions/products/getAllProducts";
require("./config/config").config("ch");

async function test() {
  try {
    const products = await getAllProducts();

    const categories = await getAllCategories();
    console.log(`${categories.length} categories`);
    const subcategories = categories.filter((c) => c.parent_id !== 0);
    console.log(`${subcategories.length} subcategories`);

    function findCat(id: number) {
      const found = categories.find((c) => (c.id = id));
      if (!found) {
        throw new Error(`could not find category ${id}`);
      }
      return found;
    }

    const parentCategoryIds: number[] = [
      ...new Set(categories.map((c) => c.parent_id).filter((i) => i !== 0)),
    ];

    const bottomCategoriesIDs = categories
      .filter((c) => !parentCategoryIds.includes(c.id))
      .map((c) => c.id);

    
    

    

    console.log("orderedsubcategories", orderedsubcategories.length);

    for (let i = 0; i < orderedsubcategories.length; i++) {
      const c = orderedsubcategories[i];

      console.log(
        `addressing ${i + 1} of ${orderedsubcategories.length} categories id (${
          c.id
        })`
      );

      const items = products.filter((p) => p.categories.includes(c.id));
      for (let ii = 0; ii < items.length; ii++) {
        const item = items[ii];
        if (!item.categories.includes(c.parent_id)) {
          //console.log('await addCatToProduct(item.id, c.parent_id);')
          await addCatToProduct(item.id, c.parent_id);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

test();
